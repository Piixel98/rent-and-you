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
import useAuth, {isLoggedIn} from '../../hooks/useAuth';


const UserMenu = () => {
  const { logout, user } = useAuth()
  return (
    <>
      <Box
        display={{ base: 'none', md: 'block' }}
        position="fixed"
        top={2}
        right={4}
        style={{ zIndex: 600 }}
      >
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<FaUserCircle color="white" fontSize="18px" />}
            bg={"green.400"}
            isRound
          />
          <MenuList>
            {isLoggedIn() ? (
              <>
                {user?.role == "admin" && (
                  <MenuItem icon={<FiUser fontSize="18px" />} as={Link} to="/admin">Admin Panel</MenuItem>
                  )
                }
                <MenuItem icon={<FiUser fontSize="18px" />} as={Link} to="/settings">Mi Cuenta</MenuItem>
                <MenuItem
                  icon={<FiLogOut fontSize="18px" />}
                  color="ui.danger"
                  fontWeight="bold"
                  as={Link} to="/"
                  onClick={logout}
                >
                  Cerrar sesión
                </MenuItem>
              </>
            ) : (
                <>
                  <MenuItem icon={<FiUser fontSize="18px" />} as={Link} to="/login">
                    Iniciar sesión
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
