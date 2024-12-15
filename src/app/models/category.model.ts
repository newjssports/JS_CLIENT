export interface CategoryModel {
    categoryId: number;          // Represents the unique identifier for the category
    name?: string;               // Optional: Represents the name of the category
    code?: string;               // Optional: Represents a code associated with the category
    description?: string;        // Optional: Represents a description of the category
    mainCategoryId?: number;     // Optional: Represents the ID of the associated main category
    isDefault?: boolean;         // Optional: Indicates if this is the default category
    active?: boolean;            // Optional: Indicates if the category is active
    deleted?: boolean;           // Optional: Indicates if the category is deleted
  }