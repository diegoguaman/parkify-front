import { Container } from "@mui/material";
import { Instagram, YouTube, LinkedIn,} from "@mui/icons-material";
import twitterLogo from "../../../assets/logo/logo-twitter.svg"
import logoParkify from "../../../assets/logo/logo-blanco.svg"
import {
  FooterWrapper,
  LogoImage,
  SocialIcons,
  SocialButton,
  LinkGroup,
  FooterLink,
} from "./Footer.styles";

const Footer: React.FC = () => {
  return (
    <FooterWrapper component="footer">
      <Container maxWidth="sm">
        <LogoImage src={logoParkify} alt="Logo de Parkify" />

        <SocialIcons>
          <SocialButton href="#" aria-label="Instagram">
            <Instagram />
          </SocialButton>
          <SocialButton href="#" aria-label="YouTube">
            <YouTube />
          </SocialButton>
          <SocialButton href="#" aria-label="LinkedIn">
            <LinkedIn />
          </SocialButton>
          <SocialButton href="#" aria-label="X">
          <img src={twitterLogo} alt="X" width={24} height={24} />
</SocialButton>
        </SocialIcons>

        <FooterLink href="mailto:consultas@parkify.com">
          consultas@parkify.com
        </FooterLink>

        <LinkGroup>
          <FooterLink href="#quienes-somos">¿Quiénes somos?</FooterLink>
          <FooterLink href="#contacto">Contacto</FooterLink>
        </LinkGroup>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;