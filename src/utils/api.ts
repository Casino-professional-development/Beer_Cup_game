// API utility functions for backend integration
const API_BASE_URL = (window as any).env?.SERVER_API || 'http://localhost:3001/api/beers';

export interface BeerRecord {
  _id?: string;
  userId: string;
  balance: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

// Generate unique user ID
export const generateUserId = (): string => {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Get or create user beer record
export const getOrCreateUserBeer = async (userId: string): Promise<BeerRecord> => {
  try {
    // First try to get existing user
    const response = await fetch(`${API_BASE_URL}/user/${userId}`);
    
    // Check if response is HTML (backend not available)
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.warn('Backend not available, using fallback user record');
      return {
        userId,
        balance: 5000,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    }
    
    if (response.ok) {
      const data = await response.json();
      return data;
    } else if (response.status === 404) {
      // User doesn't exist, create new one with 5000 balance
      const createResponse = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          balance: 5000
        }),
      });
      
      if (createResponse.ok) {
        const data = await createResponse.json();
        return data.data;
      } else {
        const errorText = await createResponse.text();
        console.error('Backend error response:', errorText);
        throw new Error(`Failed to create user beer record: ${createResponse.status} ${createResponse.statusText}`);
      }
    } else {
      const errorText = await response.text();
      console.error('Backend error response:', errorText);
      throw new Error(`Failed to fetch user beer record: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error in getOrCreateUserBeer:', error);
    
    // If backend is not available, return a fallback record
    if (error instanceof TypeError || error instanceof SyntaxError) {
      console.warn('Backend not available, using fallback user record');
      return {
        userId,
        balance: 5000,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    }
    
    throw error;
  }
};

// Update user balance
export const updateUserBalance = async (userId: string, balance: number): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/${userId}/balance`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ balance }),
    });
    
    // Check if response is HTML (backend not available)
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.warn('Backend not available, balance update skipped');
      return;
    }
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Backend error response:', errorText);
      throw new Error(`Failed to update user balance: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error updating user balance:', error);
    
    // If backend is not available, just log and continue
    if (error instanceof TypeError || error instanceof SyntaxError) {
      console.warn('Backend not available, balance update skipped');
      return;
    }
    
    throw error;
  }
};

// Get all beers (for debugging)
export const getAllBeers = async (): Promise<BeerRecord[]> => {
  try {
    const response = await fetch(API_BASE_URL);
    
    // Check if response is HTML (backend not available)
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.warn('Backend not available, returning empty beers array');
      return [];
    }
    
    if (response.ok) {
      return await response.json();
    } else {
      const errorText = await response.text();
      console.error('Backend error response:', errorText);
      throw new Error(`Failed to fetch all beers: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error fetching all beers:', error);
    
    // If backend is not available, return empty array
    if (error instanceof TypeError || error instanceof SyntaxError) {
      console.warn('Backend not available, returning empty beers array');
      return [];
    }
    
    throw error;
  }
};
