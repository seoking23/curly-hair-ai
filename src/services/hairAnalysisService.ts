import {HairTextureType} from '../types/ApplicationTypes';
import {supabase} from './supabase';
import {HAIR_ANALYSIS_API_ENDPOINT, HAIR_ANALYSIS_API_KEY} from '@env';

export interface HairAnalysisResponse {
  hairType: HairTextureType;
  confidence: number;
  alternativeTypes?: HairTextureType[];
  metadata?: {
    imageQuality: number;
    processingTime: number;
    recommendations?: string[];
  };
  error?: string;
}

export interface HairAnalysisError {
  code: string;
  message: string;
  details?: any;
}

interface ApiAnalysisResult {
  hairType: string;
  confidence: number;
  alternativeTypes?: string[];
  imageQuality: number;
  processingTime: number;
  recommendations?: string[];
}

class HairAnalysisService {
  private readonly API_ENDPOINT = HAIR_ANALYSIS_API_ENDPOINT;
  private readonly API_KEY = HAIR_ANALYSIS_API_KEY;

  /**
   * Analyzes a hair image to determine the hair type
   * @param imageUri - The URI of the image to analyze
   * @returns Promise<HairAnalysisResponse>
   */
  async analyzeHairImage(imageUri: string): Promise<HairAnalysisResponse> {
    if (!this.API_KEY) {
      throw new Error('Hair analysis API key is not configured');
    }

    try {
      console.log(
        'hairAnalysisService.ts - Starting hair analysis for image:',
        imageUri,
      );

      // First, upload the image to secure storage
      const {data: uploadData, error: uploadError} =
        await this.uploadImageToStorage(imageUri);

      if (uploadError) {
        throw new Error(`Failed to upload image: ${uploadError.message}`);
      }

      // Get the public URL for the uploaded image
      const {
        data: {publicUrl},
      } = await supabase.storage
        .from('hair-analysis-images')
        .getPublicUrl(uploadData.path);

      // Create form data for the API request
      const formData = new FormData();
      formData.append('image_url', publicUrl);
      formData.append('analysis_type', 'texture');

      // Make the API request
      const response = await fetch(this.API_ENDPOINT, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.API_KEY}`,
          Accept: 'application/json',
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to analyze hair image');
      }

      const analysisResult = (await response.json()) as ApiAnalysisResult;

      // Clean up the uploaded image after analysis
      await this.deleteImageFromStorage(uploadData.path);

      return {
        hairType: this.mapApiResponseToHairType(analysisResult.hairType),
        confidence: analysisResult.confidence,
        alternativeTypes: analysisResult.alternativeTypes?.map(type =>
          this.mapApiResponseToHairType(type),
        ),
        metadata: {
          imageQuality: analysisResult.imageQuality,
          processingTime: analysisResult.processingTime,
          recommendations: analysisResult.recommendations,
        },
      };
    } catch (error) {
      console.error('hairAnalysisService.ts - Hair analysis error:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Uploads an image to secure storage before analysis
   * @param imageUri - The URI of the image to upload
   * @returns Promise with upload result
   */
  private async uploadImageToStorage(imageUri: string) {
    try {
      const timestamp = new Date().getTime();
      const filePath = `hair-analysis/${timestamp}-${Math.random()
        .toString(36)
        .substring(7)}.jpg`;

      const response = await fetch(imageUri);
      const blob = await response.blob();

      return await supabase.storage
        .from('hair-analysis-images')
        .upload(filePath, blob, {
          contentType: 'image/jpeg',
          cacheControl: '3600',
          upsert: false,
        });
    } catch (error) {
      console.error('hairAnalysisService.ts - Image upload error:', error);
      throw error;
    }
  }

  /**
   * Deletes an analyzed image from storage
   * @param filePath - Path to the file in storage
   */
  private async deleteImageFromStorage(filePath: string) {
    try {
      await supabase.storage.from('hair-analysis-images').remove([filePath]);
    } catch (error) {
      console.error('hairAnalysisService.ts - Image deletion error:', error);
      // Don't throw the error as this is a cleanup operation
    }
  }

  /**
   * Maps the API response hair type to our application's HairTextureType enum
   * @param apiHairType - Hair type from API response
   * @returns HairTextureType
   */
  private mapApiResponseToHairType(apiHairType: string): HairTextureType {
    const typeMap: {[key: string]: HairTextureType} = {
      '3a': HairTextureType.TYPE_3A,
      '3b': HairTextureType.TYPE_3B,
      '3c': HairTextureType.TYPE_3C,
      '4a': HairTextureType.TYPE_4A,
      '4b': HairTextureType.TYPE_4B,
      '4c': HairTextureType.TYPE_4C,
    };

    const normalizedType = apiHairType.toLowerCase().replace(/[^0-9a-z]/g, '');
    return typeMap[normalizedType] || HairTextureType.TYPE_3A;
  }

  /**
   * Handles and formats errors from the API
   * @param error - The error to handle
   * @returns HairAnalysisError
   */
  private handleError(error: any): HairAnalysisError {
    if (error.response) {
      return {
        code: error.response.status.toString(),
        message: error.response.data?.message || 'Hair analysis failed',
        details: error.response.data,
      };
    }
    return {
      code: 'UNKNOWN_ERROR',
      message:
        error.message || 'An unexpected error occurred during hair analysis',
      details: error,
    };
  }
}

export const hairAnalysisService = new HairAnalysisService();
