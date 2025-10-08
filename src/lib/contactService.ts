// Contact service for advocacy communications
// Handles sending emails, tracking engagement, and managing contact history

import { Legislator, MessageTemplate } from './representativeLookup';

export interface ContactAction {
  id: string;
  userName: string;
  userEmail?: string;
  legislator: Legislator;
  template: MessageTemplate;
  message: string;
  method: 'email' | 'letter' | 'phone' | 'social';
  status: 'sent' | 'pending' | 'failed';
  timestamp: string;
  response?: {
    received: boolean;
    date?: string;
    notes?: string;
  };
}

export interface ContactResult {
  success: boolean;
  messageId?: string;
  error?: string;
  trackingUrl?: string;
}

export class ContactService {
  // In a real application, this would integrate with email services like SendGrid, Mailgun, etc.
  static async sendEmail(
    legislator: Legislator,
    template: MessageTemplate,
    personalizedMessage: string,
    userName: string,
    userEmail?: string
  ): Promise<ContactResult> {
    try {
      // Validate inputs
      if (!legislator.contact?.email) {
        return {
          success: false,
          error: 'No email address available for this representative',
        };
      }

      if (!userEmail) {
        return {
          success: false,
          error: 'User email is required to send messages',
        };
      }

      // In production, this would use a real email service
      // For now, we'll simulate the email sending process
      const emailData = {
        to: legislator.contact.email,
        from: userEmail,
        subject: template.subject,
        body: personalizedMessage,
        replyTo: userEmail,
      };

      console.log('Sending email:', emailData);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Generate a mock message ID for tracking
      const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      return {
        success: true,
        messageId,
        trackingUrl: `/track/${messageId}`,
      };
    } catch (error) {
      console.error('Email sending failed:', error);
      return {
        success: false,
        error: 'Failed to send email. Please try again later.',
      };
    }
  }

  static async sendLetter(
    legislator: Legislator,
    template: MessageTemplate,
    personalizedMessage: string,
    userName: string,
    userAddress: string
  ): Promise<ContactResult> {
    try {
      // Validate inputs
      if (!legislator.contact?.mailingAddress) {
        return {
          success: false,
          error: 'No mailing address available for this representative',
        };
      }

      // In production, this would integrate with a print-to-mail service
      // For now, we'll simulate the process
      const letterData = {
        to: {
          name: legislator.name,
          address: legislator.contact.mailingAddress,
        },
        from: {
          name: userName,
          address: userAddress,
        },
        content: personalizedMessage,
        subject: template.subject,
      };

      console.log('Preparing letter:', letterData);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const messageId = `ltr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      return {
        success: true,
        messageId,
        trackingUrl: `/track/${messageId}`,
      };
    } catch (error) {
      console.error('Letter preparation failed:', error);
      return {
        success: false,
        error: 'Failed to prepare letter. Please try again later.',
      };
    }
  }

  static async makePhoneCall(
    legislator: Legislator,
    script: string,
    userName: string
  ): Promise<ContactResult> {
    try {
      // For phone calls, we primarily track the intent and provide the script
      // Actual calling would be handled by the user

      if (!legislator.contact?.phone && !legislator.contact?.officePhone) {
        return {
          success: false,
          error: 'No phone number available for this representative',
        };
      }

      const callData = {
        representative: legislator.name,
        phoneNumber: legislator.contact.phone || legislator.contact.officePhone,
        script,
        userName,
      };

      console.log('Phone call prepared:', callData);

      const messageId = `call_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      return {
        success: true,
        messageId,
        trackingUrl: `/track/${messageId}`,
      };
    } catch (error) {
      console.error('Phone call preparation failed:', error);
      return {
        success: false,
        error: 'Failed to prepare phone call information.',
      };
    }
  }

  static async postToSocialMedia(
    legislator: Legislator,
    message: string,
    platform: 'twitter' | 'facebook' | 'instagram',
    userName: string
  ): Promise<ContactResult> {
    try {
      // Social media posting would integrate with platform APIs
      // For now, we'll simulate and provide guidance

      if (!legislator.socialMedia || legislator.socialMedia.length === 0) {
        return {
          success: false,
          error: 'No social media information available for this representative',
        };
      }

      const socialAccount = legislator.socialMedia.find(
        (account) => account.platform.toLowerCase() === platform.toLowerCase()
      );

      if (!socialAccount) {
        return {
          success: false,
          error: `No ${platform} account found for this representative`,
        };
      }

      const socialData = {
        platform,
        handle: socialAccount.handle,
        url: socialAccount.url,
        message,
        userName,
      };

      console.log(`Social media post prepared for ${platform}:`, socialData);

      const messageId = `social_${platform}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      return {
        success: true,
        messageId,
        trackingUrl: `/track/${messageId}`,
      };
    } catch (error) {
      console.error('Social media post preparation failed:', error);
      return {
        success: false,
        error: 'Failed to prepare social media post.',
      };
    }
  }

  // Track engagement and responses
  static async trackEngagement(action: Omit<ContactAction, 'id' | 'timestamp'>): Promise<string> {
    const engagementId = `eng_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const engagementData = {
      id: engagementId,
      ...action,
      timestamp: new Date().toISOString(),
    };

    // In production, this would save to a database
    console.log('Tracking engagement:', engagementData);

    // Store in localStorage for demo purposes
    const existingEngagements = JSON.parse(localStorage.getItem('advocacy_engagements') || '[]');
    existingEngagements.push(engagementData);
    localStorage.setItem('advocacy_engagements', JSON.stringify(existingEngagements));

    return engagementId;
  }

  static getEngagementHistory(): ContactAction[] {
    try {
      return JSON.parse(localStorage.getItem('advocacy_engagements') || '[]');
    } catch {
      return [];
    }
  }

  static getEngagementStats(): {
    totalActions: number;
    byMethod: Record<string, number>;
    byStatus: Record<string, number>;
    recentActivity: ContactAction[];
  } {
    const history = this.getEngagementHistory();

    const byMethod = history.reduce((acc, action) => {
      acc[action.method] = (acc[action.method] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const byStatus = history.reduce((acc, action) => {
      acc[action.status] = (acc[action.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const recentActivity = history
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10);

    return {
      totalActions: history.length,
      byMethod,
      byStatus,
      recentActivity,
    };
  }
}
