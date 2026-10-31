import PropTypes from 'prop-types';
import React from 'react';
import {FormattedMessage} from 'react-intl';

import LanguageMenu from './language-menu.jsx';
import MenuBarMenu from './menu-bar-menu.jsx';
import {MenuSection} from '../menu/menu.jsx';
import MenuLabel from './tw-menu-label.jsx';
import TWAccentThemeMenu from './tw-theme-accent.jsx';
import TWGuiThemeMenu from './tw-theme-gui.jsx';
import TWBlocksThemeMenu from './tw-theme-blocks.jsx';
import TWDesktopSettings from './tw-desktop-settings.jsx';
import {MenuItem} from '../menu/menu.jsx';

import menuBarStyles from './menu-bar.css';
import styles from './settings-menu.css';

import dropdownCaret from './dropdown-caret.svg';
import settingsIcon from './icon--settings.svg';
import addonsIcon from './addons.svg';
import advancedIcon from './tw-advanced.svg';

const SettingsMenu = ({
    canChangeLanguage,
    canChangeTheme,
    isRtl,
    onClickAddons,
    onClickAdvanced,
    onClickDesktopSettings,
    onOpenCustomSettings,
    onRequestClose,
    onRequestOpen,
    settingsMenuOpen
}) => (
    <MenuLabel
        open={settingsMenuOpen}
        onOpen={onRequestOpen}
        onClose={onRequestClose}
    >
        <img
            src={settingsIcon}
            draggable={false}
            width={20}
            height={20}
        />
        <span className={styles.dropdownLabel}>
            <FormattedMessage
                defaultMessage="Settings"
                description="Settings menu"
                id="gui.menuBar.settings"
            />
        </span>
        <img
            src={dropdownCaret}
            draggable={false}
            width={8}
            height={5}
        />
        <MenuBarMenu
            className={menuBarStyles.menuBarMenu}
            open={settingsMenuOpen}
            place={isRtl ? 'left' : 'right'}
        >
            <MenuSection>
                {canChangeLanguage && <LanguageMenu onRequestCloseSettings={onRequestClose} />}
                {canChangeTheme && (
                    <React.Fragment>
                        <TWGuiThemeMenu />
                        <TWBlocksThemeMenu
                            onOpenCustomSettings={onOpenCustomSettings}
                        />
                        <TWAccentThemeMenu />
                    </React.Fragment>
                )}
                {onClickDesktopSettings && <TWDesktopSettings onClick={onClickDesktopSettings} />}
            </MenuSection>
            {/* HubBlocks: Addons and Advanced moved here from the menu bar */}
            {(onClickAddons || onClickAdvanced) && (
                <MenuSection>
                    {onClickAddons && (
                        <MenuItem onClick={onClickAddons}>
                            <div className={styles.option}>
                                <img
                                    src={addonsIcon}
                                    draggable={false}
                                    width={24}
                                    height={24}
                                    alt=""
                                />
                                <FormattedMessage
                                    defaultMessage="Addons"
                                    description="Button to open addon settings"
                                    id="tw.menuBar.addons"
                                />
                            </div>
                        </MenuItem>
                    )}
                    {onClickAdvanced && (
                        <MenuItem onClick={onClickAdvanced}>
                            <div className={styles.option}>
                                <img
                                    src={advancedIcon}
                                    draggable={false}
                                    width={24}
                                    height={24}
                                    alt=""
                                />
                                <FormattedMessage
                                    defaultMessage="Advanced"
                                    description="Button to open advanced settings menu"
                                    id="tw.menuBar.advanced"
                                />
                            </div>
                        </MenuItem>
                    )}
                </MenuSection>
            )}
        </MenuBarMenu>
    </MenuLabel>
);

SettingsMenu.propTypes = {
    canChangeLanguage: PropTypes.bool,
    canChangeTheme: PropTypes.bool,
    isRtl: PropTypes.bool,
    onClickAddons: PropTypes.func,
    onClickAdvanced: PropTypes.func,
    onClickDesktopSettings: PropTypes.func,
    onOpenCustomSettings: PropTypes.func,
    onRequestClose: PropTypes.func,
    onRequestOpen: PropTypes.func,
    settingsMenuOpen: PropTypes.bool
};

export default SettingsMenu;
