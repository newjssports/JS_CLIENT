export interface MainCategoryModel {
    mainCategoryId: number;
    name?: string;         // Optional: Represents the name of the category
    code?: string;         // Optional: Represents a code associated with the category
    description?: string;  // Optional: Represents a description of the category
    isDefault?: boolean;   // Optional: Indicates if this is the default category
    active?: boolean;      // Optional: Indicates if the category is active
    deleted?: boolean;     // Optional: Indicates if the category is deleted
  }

  export interface MainCategoryAddModel {
    mainCategoryId: number;
    name?: string;
    code?: string;
    description?: string;
  }
  