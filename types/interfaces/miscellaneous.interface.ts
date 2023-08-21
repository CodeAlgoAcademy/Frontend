export interface ITabs {
   tabName: string | undefined;
   component: React.ReactElement | undefined;
}

export interface IInputFields {
   type: string;
   placeholder: string;
   name: string;
   value: string | number;
   required?: boolean;
}

export interface DynamicChechbox {
   [key: string]: boolean;
}
