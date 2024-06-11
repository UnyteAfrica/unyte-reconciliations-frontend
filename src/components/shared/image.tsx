import { ComponentPropsWithoutRef, FC } from "react";

const imageTypes = {};

interface CommonData
  extends Omit<ComponentPropsWithoutRef<"img">, "src" | "alt"> {
  alt: string;
}

type Src = {
  src: string;
};

export type ImageType = keyof typeof imageTypes;

type Type = {
  type: ImageType;
};

type SrcOrType =
  | (Src & Partial<Record<keyof Type, never>>)
  | (Type & Partial<Record<keyof Src, never>>);

type ImageProps = SrcOrType & CommonData;

export const Image: FC<ImageProps> = ({ alt, ...props }) => {
  // if (props.type) {
  //   const { type } = props;
  //   return <img src={imageTypes[type]} alt={alt} {...props} />;
  // }
  if (props.src) {
    return <img {...props} src={props.src} alt={alt} />;
  }
};
