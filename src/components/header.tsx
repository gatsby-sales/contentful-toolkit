import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Menu, X } from "react-feather"
import {
  Container,
  Flex,
  FlexList,
  Space,
  NavLink,
  Button,
  InteractiveIcon,
  Nudge,
  VisuallyHidden,
} from "./ui"
import {
  mobileNavOverlay,
  mobileNavLink,
  desktopHeaderNavWrapper,
  mobileHeaderNavWrapper,
  mobileNavSVGColorWrapper,
} from "./header.css"
import NavItemGroup from "./nav-item-group"
import BrandLogo from "./brand-logo"

// type NavItem = {
//   id: string
//   navItemType: "Link"
//   href: string
//   text: string
// }

// type NavItemGroup = {
//   id: string
//   navItemType: "Group"
//   name: string
//   navItems: NavItemGroupNavItem[]
// }

interface HeaderData {
  layout: {
    header: {
      id: string
      navItems: ContentfulComponentLink[] | ContentfulComponentList[]
      cta: ContentfulComponentLink
    }
  }
}

export default function Header() {
  const data: HeaderData = useStaticQuery(graphql`
    query {
      layout: contentfulLayout {
        header {
          id
          navItems {
            ... on ContentfulComponentList {
              id
              name
              listType
              items {
                ... on ContentfulComponentLink {
                  id
                  text
                  url
                  target {
                    slug
                  }
                  icon {
                    image {
                      gatsbyImageData
                    }
                    alt
                  }
                }
                ... on ContentfulComponentLinkWDescription {
                  id
                  description
                  link {
                    text
                    url
                    target {
                      slug
                    }
                    icon {
                      image {
                        gatsbyImageData
                      }
                      alt
                    }
                  }
                }
              }
            }
            ... on ContentfulComponentLink {
              id
              text
              target {
                slug
              }
              url
            }
          }
          cta {
            id
            url
            text
          }
        }
      }
    }
  `)

  const { navItems, cta } = data.layout.header
  const [isOpen, setOpen] = React.useState(false)

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = "hidden"
    } else {
      document.body.style.overflowY = "visible"
    }
  }, [isOpen])

  return (
    <header>
      <Container className={desktopHeaderNavWrapper}>
        <Space size={2} />
        <Flex variant="spaceBetween">
          <NavLink to="/">
            <VisuallyHidden>Home</VisuallyHidden>
            <BrandLogo />
          </NavLink>
          <nav>
            <FlexList gap={4}>
              {navItems &&
                navItems.map((navItem) => (
                  <li key={navItem.id}>
                    {navItem.listType ? (
                      <NavItemGroup
                        name={navItem.name}
                        navItems={navItem.items}
                      />
                    ) : (
                      <NavLink to={navItem.target || navItem.url}>
                        {navItem.text}
                      </NavLink>
                    )}
                  </li>
                ))}
            </FlexList>
          </nav>
          <div>{cta && <Button to={cta.href}>{cta.text}</Button>}</div>
        </Flex>
      </Container>
      <Container className={mobileHeaderNavWrapper[isOpen ? "open" : "closed"]}>
        <Space size={2} />
        <Flex variant="spaceBetween">
          <span
            className={
              mobileNavSVGColorWrapper[isOpen ? "reversed" : "primary"]
            }
          >
            <NavLink to="/">
              <VisuallyHidden>Home</VisuallyHidden>
              <BrandLogo />
            </NavLink>
          </span>
          <Flex>
            <Space />
            <div>
              {cta && (
                <Button to={cta.href} variant={isOpen ? "reversed" : "primary"}>
                  {cta.text}
                </Button>
              )}
            </div>
            <Nudge right={3}>
              <InteractiveIcon
                title="Toggle menu"
                onClick={() => setOpen(!isOpen)}
                className={
                  mobileNavSVGColorWrapper[isOpen ? "reversed" : "primary"]
                }
              >
                {isOpen ? <X /> : <Menu />}
              </InteractiveIcon>
            </Nudge>
          </Flex>
        </Flex>
      </Container>
      {isOpen && (
        <div className={mobileNavOverlay}>
          <nav>
            <FlexList responsive variant="stretch">
              {navItems?.map((navItem) => (
                <li key={navItem.id}>
                  {navItem.listType ? (
                    <NavItemGroup
                      name={navItem.name}
                      navItems={navItem.items}
                    />
                  ) : (
                    <NavLink
                      to={navItem.target || navItem.url}
                      className={mobileNavLink}
                    >
                      {navItem.text}
                    </NavLink>
                  )}
                </li>
              ))}
            </FlexList>
          </nav>
        </div>
      )}
    </header>
  )
}
