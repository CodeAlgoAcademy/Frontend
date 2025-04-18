export interface ITabs {
   tabName: string | undefined;
   component: React.ReactElement | undefined;
}

export interface IInputFields {
   type: string;
   placeholder: string;
   name: string;
   value?: string | number;
   required?: boolean;
}

export interface DynamicChechbox {
   [key: string]: boolean;
}

export interface DictionaryMeaning {
   word: string;
   meanings: {
      partOfSpeech: string;
      definitions: {
         definition: string;
         example: string;
      }[];
   }[];
}

export interface DictionaryDefinitions {
   word: string;
   partOfSpeech: string;
   definition: string;
   example: string;
}
