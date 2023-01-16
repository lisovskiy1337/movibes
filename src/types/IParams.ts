import { Params } from "react-router-dom";

export interface MyParams extends Params {
    videoType: string;
    id: string;
  };