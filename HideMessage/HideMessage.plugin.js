/**
 * @name HideMessage
 * @description Lets you locally delete messages!
 * @author Len
 * @authorLink https://discord.com/users/295103995192672256
 * @authorId 295103995192672256
 * @version 1.0.0
 * @updateUrl https://raw.githubusercontent.com/suvan1911/BDPlugins/main/HideMessage/HideMessage.plugin.js
 * @source https://github.com/suvan1911/BDPlugins
 */

 module.exports = class HideMessage {
    constructor() {
        this.hiddenIds = []
    }
    start() {
       const MenuItem = BdApi.findModuleByProps("MenuItem");
       const MessageContextMenu = BdApi.findModule((m) => m?.default?.displayName === "MessageContextMenu")
       const Dispatcher = BdApi.findModuleByProps('dirtyDispatch');

       BdApi.Patcher.after("MessageContextMenuPatch", MessageContextMenu, "default", (that, args, value) => {
           const [props] = args;    
           let message = props.message
           value.props.children.push(BdApi.React.createElement(MenuItem.MenuItem, {
               label: (this.hiddenIds.includes(message.id)? "Unhide Message": "Hide Message"),
               id: "custom",
               color: "colorDanger",
               action: () => {
                    message.blocked = !message.blocked
                    this.hiddenIds.includes(message.id)? this.hiddenIds.splice(this.hiddenIds.indexOf(message.id),1): this.hiddenIds.push(message.id)
                    Dispatcher.dirtyDispatch({type: "MESSAGE_UPDATE", message: message})
               }
           }))
           return value;
       }); 
    }
    stop() {
       BdApi.Patcher.unpatchAll("MessageContextMenuPatch")
    } 
}