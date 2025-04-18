import { AnimatePresence, motion } from "framer-motion"
import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react"
import { SunIcon, MoonIcon } from "@chakra-ui/icons"

const ThemeToggleButton = () => {
  const { toggleColorMode } = useColorMode()
  
  return (
    <AnimatePresence mode="wait" initial="false">
      <motion.div
        style={{ display: "inline-block" }}
        key={useColorModeValue("light", "dark")}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <IconButton
          aria-label="Toggle color mode"
          colorScheme={useColorModeValue("purple", "orange")}
          icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
          onClick={toggleColorMode}
          role="switch"
          aria-checked={useColorModeValue(false, true)}
          title={useColorModeValue("Switch to dark mode", "Switch to light mode")}
        ></IconButton>
      </motion.div>
    </AnimatePresence>
  )
}

export default ThemeToggleButton
