/**
 * @name HideMessage
 * @author Len#7817
 * @authorId 295103995192672256
 * @description Lets you locally delete messages!
 * @version 1.0.0
 */

 module.exports = class HideMessage {
    constructor() {}
    start() {
       const MenuItem = BdApi.findModuleByProps("MenuItem");
       const MessageContextMenu = BdApi.findModule((m) => m?.default?.displayName === "MessageContextMenu")
       const Dispatcher = BdApi.findModuleByProps('dirtyDispatch');

       BdApi.Patcher.after("MessageContextMenuPatch", MessageContextMenu, "default", (that, args, value) => {
           const [props] = args;    
           let message = props.message
           if (message.hidden === true) {

           }
           value.props.children.push(BdApi.React.createElement(MenuItem.MenuItem, {
               label: (message.hidden? "Unhide Message": "Hide Message"),
               id: "custom",
               color: "colorDanger",
               action: () => {
                    message.blocked = true
                    message.hidden = true
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