import { SocialLink } from "@/types";
import { IconBrandGithub, IconBrandLinkedin, IconBrandX, IconBrandDribbble, IconBrandBehance, IconBrandInstagram, IconMail } from "@tabler/icons-react";
import { ReactElement } from "react";

export const getSocialIcon = (platform: SocialLink["platform"]): ReactElement => {
  switch (platform) {
    case "github":
      return <IconBrandGithub size={ 20 } />;
    case "linkedin":
      return <IconBrandLinkedin size={ 20 } />;
    case "x":
      return <IconBrandX size={ 20 } />;
    case "dribbble":
      return <IconBrandDribbble size={ 20 } />;
    case "behance":
      return <IconBrandBehance size={ 20 } />;
    case "instagram":
      return <IconBrandInstagram size={ 20 } />;
    case "email":
      return <IconMail size={ 20 } />;
    default:
      return <IconBrandGithub size={ 20 } />;
  }
};