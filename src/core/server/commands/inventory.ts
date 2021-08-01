import * as alt from 'alt-server';
import { Permissions } from '../../shared/flags/permissions';
import { LOCALE_KEYS } from "../../shared/locale/languages/keys";
import { LocaleController } from "../../shared/locale/locale";
import { playerFuncs } from '../extensions/Player';
import ChatController from "../systems/chat";

ChatController.addCommand(
    'clearinventory',
    LocaleController.get(LOCALE_KEYS.COMMAND_CLEAR_INVENTORY, '/clearinventory'),
    Permissions.Admin,
    clearInventory
);

ChatController.addCommand(
    'cleartoolbar',
    LocaleController.get(LOCALE_KEYS.COMMAND_CLEAR_TOOLBAR, '/cleartoolbar'),
    Permissions.Admin,
    clearToolbar
);

ChatController.addCommand(
    'clearequipment',
    LocaleController.get(LOCALE_KEYS.COMMAND_CLEAR_EQUIPMENT, '/clearequipment'),
    Permissions.Admin,
    clearEquipment
);

function clearInventory(player: alt.Player) {
    player.data.inventory = new Array(6);
    for (let i = 0; i < player.data.inventory.length; i++) {
        player.data.inventory[i] = [];
    }
    playerFuncs.save.field(player, 'inventory', player.data.inventory);
    playerFuncs.sync.inventory(player);
}

function clearToolbar(player: alt.Player) {
    player.data.toolbar = [];
    playerFuncs.save.field(player, 'toolbar', player.data.toolbar);
    playerFuncs.sync.inventory(player);
}

function clearEquipment(player: alt.Player) {
    player.data.equipment = [];
    playerFuncs.save.field(player, 'equipment', player.data.equipment);
    playerFuncs.sync.inventory(player);
}