import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import { logger } from '../server.js';

const LINKEDIN_API_BASE = 'https://api.linkedin.com/v2';
const LINKEDIN_MEDIA_API = 'https://api.linkedin.com/rest';

// Rate limiting
let dailyPostCount = 0;
let lastResetDate = new Date().toDateString();

function checkRateLimit() {
  const today = new Date().toDateString();
  if (today !== lastResetDate) {
    dailyPostCount = 0;
    lastResetDate = today;
  }
  
  if (dailyPostCount >= (process.env.LINKEDIN_RATE_LIMIT || 100)) {
    throw new Error('LinkedIn daily rate limit reached');
  }
}

export async function postToLinkedIn({ content, imageUrl, imageFile }) {
  try {
    checkRateLimit();
    
    const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
    const organizationId = process.env.LINKEDIN_ORGANIZATION_ID || process.env.LINKEDIN_PAGE_ID;
    
    if (!accessToken || !organizationId) {
      throw new Error('LinkedIn credentials not configured. Please set LINKEDIN_ACCESS_TOKEN and LINKEDIN_ORGANIZATION_ID in environment variables.');
    }
    
    let mediaAsset = null;
    
    // Upload image if provided
    if (imageUrl || imageFile) {
      mediaAsset = await uploadImageToLinkedIn(imageUrl, imageFile);
    }
    
    // Create the post
    const postData = {
      author: `urn:li:organization:${organizationId}`,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: {
            text: content
          },
          shareMediaCategory: mediaAsset ? 'IMAGE' : 'NONE',
          ...(mediaAsset && {
            media: [{
              status: 'READY',
              description: {
                text: 'Posted by MSPIL Marketing Agent'
              },
              media: mediaAsset,
              title: {
                text: 'MSPIL Update'
              }
            }]
          })
        }
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
      }
    };
    
    const response = await axios.post(
      `${LINKEDIN_API_BASE}/ugcPosts`,
      postData,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0'
        }
      }
    );
    
    dailyPostCount++;
    
    const postId = response.data.id;
    const postUrl = `https://www.linkedin.com/feed/update/${postId}`;
    
    logger.info('Successfully posted to LinkedIn:', { postId, postUrl });
    
    return {
      success: true,
      id: postId,
      url: postUrl
    };
    
  } catch (error) {
    logger.error('LinkedIn posting error:', error.response?.data || error.message);
    throw error;
  }
}

async function uploadImageToLinkedIn(imageUrl, imageFile) {
  try {
    const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
    const organizationId = process.env.LINKEDIN_ORGANIZATION_ID || process.env.LINKEDIN_PAGE_ID;
    
    // Step 1: Register the upload
    const registerResponse = await axios.post(
      `${LINKEDIN_API_BASE}/assets?action=registerUpload`,
      {
        registerUploadRequest: {
          recipes: ['urn:li:digitalmediaRecipe:feedshare-image'],
          owner: `urn:li:organization:${organizationId}`,
          serviceRelationships: [{
            relationshipType: 'OWNER',
            identifier: 'urn:li:userGeneratedContent'
          }]
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    const asset = registerResponse.data.value.asset;
    const uploadUrl = registerResponse.data.value.uploadMechanism['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest'].uploadUrl;
    
    // Step 2: Upload the image
    let imageData;
    if (imageFile) {
      imageData = fs.readFileSync(imageFile);
    } else if (imageUrl) {
      const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      imageData = Buffer.from(imageResponse.data);
    }
    
    await axios.post(uploadUrl, imageData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'image/jpeg'
      }
    });
    
    return asset;
    
  } catch (error) {
    logger.error('LinkedIn image upload error:', error);
    throw error;
  }
}

export async function getLinkedInProfile() {
  try {
    const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
    const organizationId = process.env.LINKEDIN_ORGANIZATION_ID || process.env.LINKEDIN_PAGE_ID;
    
    const response = await axios.get(
      `${LINKEDIN_API_BASE}/organizations/${organizationId}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'X-Restli-Protocol-Version': '2.0.0'
        }
      }
    );
    
    return response.data;
    
  } catch (error) {
    logger.error('LinkedIn profile fetch error:', error);
    throw error;
  }
}

export async function getPostAnalytics(postId) {
  try {
    const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
    
    // Get post statistics
    const response = await axios.get(
      `${LINKEDIN_API_BASE}/organizationalEntityShareStatistics?q=organizationalEntity&organizationalEntity=urn:li:share:${postId}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'X-Restli-Protocol-Version': '2.0.0'
        }
      }
    );
    
    const stats = response.data.elements[0];
    
    return {
      impressions: stats.totalShareStatistics.impressionCount,
      clicks: stats.totalShareStatistics.clickCount,
      likes: stats.totalShareStatistics.likeCount,
      comments: stats.totalShareStatistics.commentCount,
      shares: stats.totalShareStatistics.shareCount,
      engagement: stats.totalShareStatistics.engagement
    };
    
  } catch (error) {
    logger.error('LinkedIn analytics error:', error);
    return null;
  }
}

// Alternative method using LinkedIn Pages API (newer API)
export async function postToLinkedInPages({ content, imageUrl }) {
  try {
    checkRateLimit();
    
    const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
    const organizationId = process.env.LINKEDIN_ORGANIZATION_ID || process.env.LINKEDIN_PAGE_ID;
    
    let mediaAsset = null;
    if (imageUrl) {
      // Upload image using newer API
      mediaAsset = await uploadImageV2(imageUrl);
    }
    
    const postData = {
      author: `urn:li:organization:${organizationId}`,
      commentary: content,
      visibility: 'PUBLIC',
      distribution: {
        feedDistribution: 'MAIN_FEED',
        targetEntities: [],
        thirdPartyDistributionChannels: []
      },
      lifecycleState: 'PUBLISHED',
      isReshareDisabledByAuthor: false
    };
    
    if (mediaAsset) {
      postData.content = {
        media: {
          title: 'MSPIL Update',
          id: mediaAsset
        }
      };
    }
    
    const response = await axios.post(
      `${LINKEDIN_MEDIA_API}/posts`,
      postData,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'LinkedIn-Version': '202401',
          'X-RestLi-Protocol-Version': '2.0.0'
        }
      }
    );
    
    dailyPostCount++;
    
    return {
      success: true,
      id: response.data.id,
      url: `https://www.linkedin.com/feed/update/${response.data.id}`
    };
    
  } catch (error) {
    logger.error('LinkedIn Pages API error:', error);
    throw error;
  }
}

async function uploadImageV2(imageUrl) {
  try {
    const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
    const organizationId = process.env.LINKEDIN_ORGANIZATION_ID || process.env.LINKEDIN_PAGE_ID;
    
    // Initialize upload
    const initResponse = await axios.post(
      `${LINKEDIN_MEDIA_API}/images?action=initializeUpload`,
      {
        initializeUploadRequest: {
          owner: `urn:li:organization:${pageId}`
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'LinkedIn-Version': '202401',
          'X-RestLi-Protocol-Version': '2.0.0'
        }
      }
    );
    
    const uploadUrl = initResponse.data.value.uploadUrl;
    const image = initResponse.data.value.image;
    
    // Download and upload image
    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    
    await axios.put(uploadUrl, imageResponse.data, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'image/jpeg'
      }
    });
    
    return image;
    
  } catch (error) {
    logger.error('Image upload V2 error:', error);
    throw error;
  }
}