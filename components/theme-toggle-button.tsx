"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ButtonGroup, ButtonGroupSeparator } from "./ui/button-group";

const ThemeModeToggleButton = (): React.JSX.Element => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const currentTheme = resolvedTheme || theme;
  const isDark: boolean = currentTheme === "dark";

  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div>
            {isDark ? (
              <ButtonGroup>
                <Button variant="ghost">
                  <Moon className="h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                </Button>
                <ButtonGroupSeparator />
                <Button variant="ghost" className="hidden md:inline">
                  Dark
                </Button>
              </ButtonGroup>
            ) : (
              <ButtonGroup>
                <Button variant="ghost">
                  <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                </Button>
                <Button variant="ghost" className="hidden md:inline">
                  Light
                </Button>
              </ButtonGroup>
            )}
            <span className="sr-only">Toggle theme</span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ThemeModeToggleButton;
