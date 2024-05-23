import React from 'react'
import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import {FaUserCircle} from 'react-icons/fa'
import { FiLogOut, FiUser } from 'react-icons/fi'

import { Link } from '@tanstack/react-router'

const UserMenu: React.FC = () => {
  const isLoggedIn = 1;

  return (
    <>
      {/* Desktop */}
      <Box
        display={{ base: 'none', md: 'block' }}
        position="fixed"
        top={2}
        right={4}
        style={{ zIndex: 10000 }}
      >
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<FaUserCircle color="white" fontSize="18px" />}
            bg="ui.main"
            isRound
          />
          <MenuList>
            {isLoggedIn ? (
              <>
                <MenuItem icon={<FiUser fontSize="18px" />} as={Link} to="/admin">
                  Admin Panel
                </MenuItem>
                <MenuItem
                  icon={<FiLogOut fontSize="18px" />}
                  color="ui.danger"
                  fontWeight="bold"
                >
                  Log out
                </MenuItem>
              </>
            ) : (
                <>
                  <MenuItem icon={<FiUser fontSize="18px" />} as={Link} to="/login">
                    Iniciar sesión
                  </MenuItem>
                  <MenuItem icon={<FiUser fontSize="18px" />} as={Link} to="/signup">
                    Registrarse
                  </MenuItem>
                </>
            )}
          </MenuList>
        </Menu>
      </Box>
    </>
  )
}

export default UserMenu
