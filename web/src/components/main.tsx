import { createStyles, Badge, Group, Title, Text, Card, SimpleGrid, Container, rem, Avatar, Transition, } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useNuiEvent } from '../hooks/useNuiEvent';

import Typewriter from "typewriter-effect";

const mockdata = [
  {
    title: 'MoneSuper',
    description: "Everything is possible if you believe in yourself!",
    Image: 'https://i.imgur.com/PKp6NvD.jpeg',
    badge: 'Project Developer',
    badgecolor: 'yellow'
  },

  {
    title: 'MoneSuper',
    description: "Everything is possible if you believe in yourself!",
    Image: 'https://i.imgur.com/PKp6NvD.jpeg',
    badge: 'Project Developer',
    badgecolor: 'yellow'
  },

  {
    title: 'MoneSuper',
    description: "Everything is possible if you believe in yourself!",
    Image: 'https://i.imgur.com/PKp6NvD.jpeg',
    badge: 'Project Developer',
    badgecolor: 'yellow'
  },

  // {
  //   title: '',
  //   description: '^_^',
  //   Image: '',
  //   badge: '',
  //   badgecolor: ''
  // }

];

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: rem(34),
    fontWeight: 900,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(24),
    },
  },

  featuresCards: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },

  description: {
    maxWidth: 600,
    margin: 'auto',

    '&::after': {
      content: '""',
      display: 'block',
      backgroundColor: theme.fn.primaryColor(),
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },

  card: {
    border: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  cardTitle: {
    '&::after': {
      content: '""',
      display: 'block',
      backgroundColor: theme.fn.primaryColor(),
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
    },
  },
}));

export function FeaturesCards() {
  const { classes } = useStyles();
  const [currentData, setCurrentData] = useState<{
    title: string;
    description: string;
    Image: string;
    badge: string;
    badgecolor: string;
  }[]>([]);

  useEffect(() => {
    setCurrentData(getRandomData());

    const interval = setInterval(() => {
      setCurrentData(getRandomData());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getRandomData = () => {
    let shuffledData = [...mockdata].sort(() => Math.random() - 0.5);

    while (isDataSame(shuffledData.slice(0, 3), currentData)) {
      shuffledData = [...mockdata].sort(() => Math.random() - 0.5);
    }

    const updatedData = shuffledData.slice(0, 3);
    return updatedData;
  };

  const isDataSame = (data1: any[], data2: any[]) => {
    const stringifyData1 = JSON.stringify(data1.map(({ title }) => title));
    const stringifyData2 = JSON.stringify(data2.map(({ title }) => title));
    return stringifyData1 === stringifyData2;
  };

  const [userName, setUserName] = useState('JENNA FOSTER');

  useNuiEvent('userinfo', (data) => {
    setUserName(data.name);
  });

  const features = currentData.map((feature, index) => (
    <Transition key={feature.title} mounted={true} transition="fade">
      {(transitionStyles) => (
        <Card
          key={feature.title}
          shadow="md"
          radius="md"
          className={classes.card}
          padding="xl"
          style={{ ...transitionStyles, zIndex: 3 - index }}
        >
          <Group>
            <Avatar size={70} radius="xl" src={feature.Image} alt={feature.title} mb="md" />
            <Badge color={feature.badgecolor} variant="light" size="md">
              {feature.badge}
            </Badge>
          </Group>
          <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
            {feature.title}
          </Text>
          <Text fz="sm" c="dimmed" mt="sm">
            {feature.description}
          </Text>
        </Card>
      )}
    </Transition>
  ));

  return (
    <Container size="xl" py="md">
      <Group position="center" style={{ marginTop: '-10vh' }}>
        <Badge color="green" variant="light" size="lg">
          Status: Online
        </Badge>
      </Group>

      <Title color="white" order={1} className={classes.title} ta="center" mt="sm">
        <Typewriter
          options={{
            strings: ['WELCOME BACK TO XYZ ROLEPLAY', userName],
            autoStart: true,
            loop: true,
          }}
        />
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md"></Text>

      <SimpleGrid cols={3} spacing="xl" mt={50} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
        {features}
      </SimpleGrid>
    </Container>
  );
}


export default function CardsShown() {
  const { classes} = useStyles();
  return (
    <div>
      <div className={classes.featuresCards}>
        <FeaturesCards />
      </div>
    </div>
  );
}