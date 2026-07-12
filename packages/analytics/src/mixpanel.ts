import Mixpanel from 'mixpanel';

// Mock token for development, in production it should use process.env.MIXPANEL_TOKEN
const token = process.env.MIXPANEL_TOKEN || 'mock-mixpanel-token';
const mixpanel = Mixpanel.init(token);

export const analytics = {
  trackUserSignup: (userId: string, email: string) => {
    mixpanel.people.set(userId, {
      $email: email,
      $created: new Date().toISOString(),
    });
    mixpanel.track('User Signup', { distinct_id: userId, email });
  },

  trackAIGenerationStart: (userId: string, productId: string, type: string) => {
    mixpanel.track('AI Generation Start', { distinct_id: userId, productId, type });
  },

  trackAIGenerationSuccess: (userId: string, productId: string, type: string, tokensUsed?: number) => {
    mixpanel.track('AI Generation Success', { 
      distinct_id: userId, 
      productId, 
      type,
      tokensUsed 
    });
  },

  trackAIGenerationFailure: (userId: string, productId: string, type: string, error: string) => {
    mixpanel.track('AI Generation Failure', { 
      distinct_id: userId, 
      productId, 
      type,
      error 
    });
  },

  trackReportExport: (userId: string, productId: string, type: string) => {
    mixpanel.track('Report Export', { distinct_id: userId, productId, type });
  },
  
  trackUpgradeToPro: (userId: string, priceId: string) => {
    mixpanel.track('Upgrade to Pro', { distinct_id: userId, priceId });
  }
};
