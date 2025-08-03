import Joi from 'joi';

export const validateChatMessage = (data) => {
  const schema = Joi.object({
    message: Joi.string().min(1).max(2000).required(),
    sessionId: Joi.string().required()
  });
  
  return schema.validate(data);
};

export const validateNewsQuery = (data) => {
  const schema = Joi.object({
    topics: Joi.array().items(Joi.string()).optional(),
    limit: Joi.number().min(1).max(50).optional(),
    dateFrom: Joi.date().optional(),
    dateTo: Joi.date().optional()
  });
  
  return schema.validate(data);
};

export const validateContentPost = (data) => {
  const schema = Joi.object({
    platform: Joi.string().valid('linkedin', 'twitter', 'instagram').required(),
    content: Joi.string().min(1).max(3000).required(),
    imageUrl: Joi.string().uri().optional(),
    scheduledTime: Joi.date().optional(),
    tags: Joi.array().items(Joi.string()).optional()
  });
  
  return schema.validate(data);
};

export const validateImageGeneration = (data) => {
  const schema = Joi.object({
    prompt: Joi.string().min(10).max(1000).required(),
    size: Joi.string().valid('1024x1024', '1792x1024', '1024x1792').optional(),
    quality: Joi.string().valid('standard', 'hd').optional(),
    style: Joi.string().valid('natural', 'vivid').optional()
  });
  
  return schema.validate(data);
};