export interface SubCategoryModel {
    subCategoryId: number;       // Represents the unique identifier for the sub-category
    categoryId?: number;         // Optional: Represents the ID of the associated category
    name?: string;               // Optional: Represents the name of the sub-category
    code?: string;               // Optional: Represents a code associated with the sub-category
    description?: string;        // Optional: Represents a description of the sub-category
    isDefault?: boolean;         // Optional: Indicates if this is the default sub-category
    active?: boolean;            // Optional: Indicates if the sub-category is active
    deleted?: boolean;           // Optional: Indicates if the sub-category is deleted
  }
  