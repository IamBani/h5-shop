
import { App } from 'vue'
import { Button, Toast, Icon, Tabbar, TabbarItem, Image, Cell, CellGroup, Grid, GridItem, Tag } from 'vant'

const VueAndtComponents = {
  install (Vue: App):void {
    Vue.component(Button.name, Button)
    Vue.component(Icon.name, Icon)
    Vue.component(Tabbar.name, Tabbar)
    Vue.component(TabbarItem.name, TabbarItem)
    Vue.component(Image.name, Image)
    Vue.component(Cell.name, Cell)
    Vue.component(CellGroup.name, CellGroup)
    Vue.component(GridItem.name, GridItem)
    Vue.component(Grid.name, Grid)
    Vue.component(Tag.name, Tag)
    Vue.config.globalProperties.$toast = Toast
  }
}
export default VueAndtComponents
