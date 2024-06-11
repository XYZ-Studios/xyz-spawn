import { useState } from 'react';
import { createStyles, Title, Text, Button, Container, rem, Group, Image, Center } from '@mantine/core';
import { fetchNui } from '../utils/fetchNui';
import logo from '../images/logo.png';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    paddingTop: rem(120),
    paddingBottom: rem(80),

    [theme.fn.smallerThan('sm')]: {
      paddingTop: rem(80),
      paddingBottom: rem(60),
    },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '50vh',
  },

  inner: {
    position: 'relative',
    zIndex: 1,
    textAlign: 'center',
    transition: 'opacity 0.3s',
    opacity: 1,
    pointerEvents: 'auto',
  },

  hidden: {
    opacity: 0,
    pointerEvents: 'none',
  },

  title: {
    fontWeight: 800,
    fontSize: rem(40),
    letterSpacing: -1,
    marginBottom: theme.spacing.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    [theme.fn.smallerThan('xs')]: {
      fontSize: rem(28),
      textAlign: 'left',
    },
  },

  highlight: {
    color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 1],
  },

  description: {
    textAlign: 'center',

    [theme.fn.smallerThan('xs')]: {
      textAlign: 'left',
      fontSize: theme.fontSizes.md,
    },
  },

  controls: {
    marginTop: theme.spacing.lg,
    display: 'flex',
    justifyContent: 'center',

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  control: {
    '&:not(:first-of-type)': {
      marginLeft: theme.spacing.md,
    },

    [theme.fn.smallerThan('xs')]: {
      height: rem(42),
      fontSize: theme.fontSizes.md,

      '&:not(:first-of-type)': {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },

  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
  },

}));

export default function HeroText() {
  const [hideContent, setHideContent] = useState(false);
  const { classes } = useStyles();

  const handleButtonClick = () => {

    fetchNui('forge-introplayer')

    setHideContent(true);
  };

  return (
    <div className={`${classes.wrapper} ${hideContent ? classes.hidden : ''}`}>
      <Container size={1400}>
        <Group position="apart" mt="md" mb="xs">
          <div className={`${classes.inner}`}>
            <div className={classes.imageContainer}>
              <Center>
                <Image src={logo} width={240} height={240} radius ='lg' alt='xyz' />
              </Center>
            </div>
            <Title className={classes.title} color='white' order={2}>
              WELCOME TO{' '}
              <Text component="span" variant='filled' color='yellow' weight={700}>
                XYZ ROLEPLAY
              </Text>{' '}
            </Title>
            <Container p={0} size={600}>
              <Text size="lg" color="white" className={classes.description}>
                Begin your journey by creating a character and exploring the world of XYZ. We hope you enjoy your stay!
              </Text>
            </Container>

            <div className={classes.controls}>
              <Button className={classes.control} size="lg" onClick={handleButtonClick}>
                BEGIN YOUR JOURNEY
              </Button>
            </div>
          </div>
        </Group>
      </Container>
    </div>
  );
}
