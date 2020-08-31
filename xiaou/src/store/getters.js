export default {
    // 菜单列表
    get_MenuList(state) {
        return state.menuList
    },
    // 角色列表
    get_RoleList(state) {
        return state.roleList
    },
    //管理员列表
    get_UserList(state) {
        return state.userList
    },
    // 商品列表
    get_CateList(state) {
        return state.cateList
    },
    // 商品规格管理
    get_SpecsList(state) {
        return state.specsList
    },
    // 商品管理列表
    get_GoodsList(state) {
        return state.goodsList
    },
    // 会员管理列表
    get_MemberList(state) {
        return state.memberList
    },
    // 轮播图管理列表
    get_BannerList(state) {
        return state.bannerList
    },
    // 限时秒杀
    get_SeckList(state) {
        return state.seckList
    }
}