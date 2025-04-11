import {
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
} from "@tabler/icons-react";
import { ActionIcon, Avatar, Container, Group, Text } from "@mantine/core";
import classes from "./Footer.module.css";

const data = [
  {
    title: "About",
    links: [
      { label: "About Us", link: "#" },
      { label: "FeedBack", link: "#" },
      { label: "Shipping And Delivery", link: "#" },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "Terms Of Service", link: "#" },
      { label: "Become a Member", link: "#" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Help Center", link: "#" },
      { label: "Career", link: "#" },
    ],
  },
];

const Footer = () => {
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text
        key={index}
        className={classes.link}
        component="a"
        href={link.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <Text className={classes.logoText}  size="xl" fw={600} mb={"sm"}>
            Ecommerce
          </Text>
          <Group
            gap={0}
            className={classes.social}
            justify="flex-end"
            wrap="nowrap"
          >
            <ActionIcon size="lg" color="black" variant="subtle">
              <IconBrandTwitter size={18} stroke={1.5} />
            </ActionIcon>
            <ActionIcon size="lg" color="black" variant="subtle">
              <IconBrandYoutube size={18} stroke={1.5} />
            </ActionIcon>
            <ActionIcon size="lg" color="black" variant="subtle">
              <IconBrandInstagram size={18} stroke={1.5} />
            </ActionIcon>
          </Group>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          © 2025 Ecommerce. All rights reserved.
        </Text>
      </Container>
    </footer>
  );
};
export default Footer;
