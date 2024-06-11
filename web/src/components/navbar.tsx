import { useState } from 'react';
import { Navbar, Tooltip, Divider, Stack, Card, Collapse, Text, Drawer, Switch, Slider, Image, Avatar, Group, ActionIcon, Button, ScrollArea, Space} from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faLocationDot, faUserGear, faMountainCity, faBuildingWheat, faTrain, faWheatAlt} from '@fortawesome/free-solid-svg-icons';
import { fetchNui } from "../utils/fetchNui";
import { locationConfig } from '../config/navConfig';
import { FeaturesCards } from './main';

import discord from '../images/discord-icon.svg';
import steam from '../images/steam-icon.svg';
import fivem from '../images/fivem-icon.svg';
import logo from '../images/logo.png';


interface NavbarLinkProps {
  icon: IconDefinition;
  label: string;
  active?: boolean;
  id?: string;
  onClick?(): void;
}

export const navItems: NavbarLinkProps[] = [
  { icon: faMountainCity, label: 'Los Santos', id: '1' },
  { icon: faTrain, label: 'Sandy Shores', id: '2'},
  { icon: faBuildingWheat, label: 'Grapeseed', id: '3'},
  { icon: faWheatAlt, label: 'Paleto Bay', id: '4'},
];

function NavbarLink({ icon, label, active, onClick }: NavbarLinkProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const linkColor = active ? 'gray' : 'gray';

  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 300, transition: 'pop' }}>
      <ActionIcon size="xl" radius="xs"onClick={handleClick} style={{ marginBottom: '16px', color: linkColor }}>
        <FontAwesomeIcon icon={icon} size="lg" />
      </ActionIcon>
    </Tooltip>
  );

}


const lastLocation = async () => {
  await fetchNui('lastlocation');
};

export function NavbarMinimal() {
  const [active, setActive] = useState(-1);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isUserDataSwitch, setIsUserDataSwitch] = useState(false);
  // const [isHousing, setIsHousing] = useState(false);

  // const [volume, setVolume] = useState(10);
  const {hovered, ref } = useHover();

  const handleNavbarLinkClick = (index: number) => {
    setActive(index);
    setIsDrawerOpen(true);
  };

  // const handleVolumeChange = async (value: number) => {
  //   const data = {
  //     volume: value
  //   };

  //   setVolume(value);

  //   await fetchNui('forge-settings', data);
  // };

  const links = navItems.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => handleNavbarLinkClick(index)}
    />
  ));

  const handleLosSantosDrawerClose = () => {setIsDrawerOpen(false); };


  // const volumeIcon = volume === 0 ? faVolumeMute : faVolumeUp;


  const renderDrawerContent = () => {
    const activeItem = navItems[active];

    if (!activeItem) return null;

    const locationContent = locationConfig[activeItem.label];

    const handleButtonClick = (index: number) => {
      const location = locationContent[index];
      if (location && location.coords) {
        const coords = location.coords;
        const data = {
          index: index,
          location: activeItem.label,
          coords: { x: coords.x, y: coords.y, z: coords.z, h: coords.h }
        };

        fetchNui('forge-spawn', data);
        setIsDrawerOpen(false);
      }
    };
    if (!locationContent) return null;

    return (
      <Stack>
        {locationContent.map((content: {title: string,  imageSrc: string; }, index: number) => (
          <Group grow position="center">
            <Card key={index} shadow="xs" padding="md" style={{ marginTop: '16px' }}>
              <Card.Section>
                <Image src={content.imageSrc} height={160} alt={activeItem.label} />
              </Card.Section>

              <Space h="md" />
              <Divider variant='solid' size="xl"/>
              <Group position="center" mt="md" mb="xs">
                <Text weight={500}>{content.title}</Text>
              </Group>

              <Button variant="light" color="yellow" fullWidth mt="md" radius="md" onClick={() => handleButtonClick(index)}>
                Select Spawn
              </Button>
            </Card>
          </Group>
        ))}
      </Stack>
    );
  };

  return (
    <Navbar height="100vh" width={{ base: "80" }} p="md">
      <Avatar src={logo} size="md" radius="xl" style={{ marginBottom: 'auto' , marginLeft: 'auto', marginRight: 'auto' }}/>
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>


      <Navbar.Section>

      <Drawer opened={isDrawerOpen} onClose={handleLosSantosDrawerClose} position="right" size="md" transitionProps={{ duration: 300, transition: 'slide-left' }}>

        <Stack spacing="md">
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
            <FontAwesomeIcon icon={faMountainCity} size="lg" />
            <span style={{ marginLeft: '15px' }}>{navItems[active]?.label}</span>
          </div>
        </Stack>


        <Divider size="sm" style={{ marginTop: '16px', marginLeft: 'auto', marginBottom: '16px' }} />
        <ScrollArea h="80vh" type="never" scrollHideDelay={500}>
          {renderDrawerContent()}
        </ScrollArea>
        </Drawer>


      <Stack justify="center" spacing={0}>
          {/* <NavbarLink icon={faHouse} onClick={() => setIsHousing(true)} label="Home" /> */}
          <NavbarLink icon={faLocationDot} label="Last Location" onClick={lastLocation} />
          <NavbarLink icon={faUserGear} label="Settings" onClick={() => setIsSettingsOpen(true)}/>
        </Stack>
      </Navbar.Section>

      <Drawer
        opened={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        position="right"
        size="md"
        transitionProps={{ duration: 300, transition: 'slide-left' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
          <FontAwesomeIcon icon={faUserGear} size="lg" />
          <span style={{ marginLeft: '15px' }}>Settings</span>
        </div>

        <Divider size="sm"  style={{ marginTop: '16px' }}/>

        {/* <Card shadow="xs" padding="md" style={{ marginTop: '16px' }}>

          <Stack>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <header style={{ marginRight: '8px' }}>Volume</header>
            </div>

            <Stack align="left">
              <Slider
                style={{ marginTop: '16px', marginRight: '8px' }}
                value={volume}
                min={0}
                max={100}
                ref={ref}
                label={null}
                styles={{
                  thumb: {
                    transition: 'opacity 150ms ease',
                    opacity: hovered ? 1 : 0,
                  },
                  dragging: {
                    opacity: 1,
                  },
                }}
                onChange={handleVolumeChange}
                id = "volumeSlider"
              />
              <FontAwesomeIcon icon={volumeIcon} size="lg" />
            </Stack>
          </Stack>
        </Card> */}

        {/* <Divider size="sm"  style={{ marginTop: '16px' }}/> */}


         {/* Player Information */}

        <Card shadow="xs" padding="md" style={{ marginTop: '16px' }}>

          <div style={{ display: 'flex', alignItems: 'center' }}>
              <header style={{ marginRight: '16px' }}>Private Data</header>
              <Switch
                style={{ marginLeft: 'auto' }}
                checked={isUserDataSwitch}
                onChange={() => setIsUserDataSwitch(!isUserDataSwitch)}
                size="lg"
                onLabel= 'On'
                offLabel= 'Off'
              />
          </div>

          <Collapse in={isUserDataSwitch}>
            <Stack style={{ marginTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar size="sm" src={steam} />
                  <span style={{ marginLeft: '8px' }}>Steam:</span>
                </div>

                <Divider size="sm" />

                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar size="sm" src={discord} />
                  <span style={{ marginLeft: '8px' }}>Discord:</span>
                </div>

                <Divider size="sm" />

                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar size="sm" src={fivem} />
                  <span style={{ marginLeft: '8px' }}>FiveM:</span>
                </div>
                <Divider size="sm" />
              </Stack>

            </Collapse>
        </Card>

        <Divider size="sm"  style={{ marginTop: '16px' }}/>

        <Card shadow="xs" padding="md" style={{ marginTop: '16px' }}>
          <Stack>

            <div style={{ display: 'flex', alignItems: 'center' }}>
                <header style={{ marginRight: '8px' }}>Credits</header>
            </div>
              <Stack align="left">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar size="lg" src="https://github.com/MoneSuper.png" />

                  <span style={{ marginLeft: '8px' }}>MoneSuper</span>

                </div>

                <Divider size="sm" />

                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar size="lg" src="https://github.com/XYZ-Studios.png" />
                  <span style={{ marginLeft: '8px' }}>XYZ-Studios</span>
                </div>
              </Stack>
          </Stack>
        </Card>


        <Divider size="sm"  style={{ marginTop: '16px' }}/>

        {/* <Card shadow="xs" padding="md" style={{ marginTop: '16px' }}>

          <Group position="apart" mt="md" mb="xs">

          </Group>

          <Button variant="light" color="blue" fullWidth mt="md" radius="md">
            Switch Character
          </Button>

          <Button variant="light" color="red" fullWidth mt="md" radius="md">
            Disconnect
          </Button>

        </Card> */}
      </Drawer>

     {/* <Drawer opened={isHousing} onClose={() => setIsHousing(false)} position="right" size="md" transitionProps={{ duration: 300, transition: 'slide-left' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
            <FontAwesomeIcon icon={faBuilding} size="lg" />
            <span style={{ marginLeft: '15px' }}>Available Properties</span>
          </div>

          <Divider size="sm" style={{ marginTop: '16px', marginLeft: 'auto', marginBottom: '16px' }} />
            <ScrollArea h="80vh" type="never" scrollHideDelay={500}>
              <Stack spacing="md">
                <Card key={1} shadow="xs" padding="md" style={{ marginTop: '16px' }}>
                  <Card.Section>
                    <Image src={logo} height={160} alt="Los Santos" />
                  </Card.Section>
                  <Space h="md" />
                  <Divider variant='solid' size="xl"/>
                  <Group position="center" mt="md" mb="xs">
                    <Text weight={500}>Nicola Drive Way 4</Text>
                  </Group>
                  <Button variant="light" color="yellow" fullWidth mt="md" radius="md">
                    Select Location
                  </Button>
                </Card>

                <Card key={1} shadow="xs" padding="md" style={{ marginTop: '16px' }}>
                <Card.Section>
                  <Image src={logo} height={160} alt="Los Santos" />
                </Card.Section>
                <Space h="md" />
                <Divider variant='solid' size="xl"/>
                <Group position="center" mt="md" mb="xs">
                  <Text weight={500}>San Andreas Avenue 1</Text>
                </Group>
                <Button variant="light" color="yellow" fullWidth mt="md" radius="md">
                  Select Location
                </Button>
              </Card>
              </Stack>

            </ScrollArea>
     </Drawer> */}
    </Navbar>
  );
}

export default function Sidebar() {
  return (
    <div>
      <NavbarMinimal />
      <Group position="apart" mt="md" mb="xs" style={{ marginTop: '-900px' }}>
        <FeaturesCards />
      </Group>
    </div>
  );
}
