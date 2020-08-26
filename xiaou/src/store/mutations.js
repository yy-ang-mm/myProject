export default {
    //菜单列表
    REQ_MENULIST(state, payload) {
        state.menuList = payload;
    },
    // 角色列表
    REQ_ROLELIST(state, payload) {
        state.roleList = payload
    },
    // 管理员列表
    REQ_USERLIST(state, payload) {
        state.userList = payload
    },
    //商品分类列表
    REQ_CATELIST(state, payload) {
        state.cateList = payload
    },
    // 商品规格列表
    REQ_SPECSLIST(state, payload) {
        state.specsList = payload
    },
    //商品管理列表
    REQ_GOODSLIST(state, payload) {
        state.goodsList = payload
    }
}