import { logger } from "@/utils/logger";

enum ApiType {
  Insurer,
  Agent,
}

type OTPInputProps = {
  apiType: ApiType;
};

export const OTPInput: React.FC<OTPInputProps> = ({ apiType }) => {
  logger.log(apiType);
  return <div></div>;
};
