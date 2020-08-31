// 引入数据接口
import { getMenuList, getUserList, getRoleList, getCateList, getSpecsList, getGoodsList, getMemberList, getBannerList, getSeckList } from "../util/axios"

export default {
    // 封装获取菜单列表
    getMenuListAction({ commit }) {
        getMenuList({
            istree: 1
        })
            .then(res => {
                if (res.code === 200) {
                    commit('REQ_MENULIST', res.list)
                }
            })
    },
    // 封装获取角色列表
    getRoleListAction({ commit }) {
        getRoleList()
            .then(res => {
                if (res.code === 200) {
                    commit('REQ_ROLELIST', res.list)
                }
            })
    },
    // 封装获取管理员列表
    getUserListAction({ commit }, pageInfo) {
        getUserList(pageInfo)
            .then(res => {
                if (res.code === 200) {
                    commit('REQ_USERLIST', res.list)
                }
            })
    },
    // 封装获取商品分类列表
    getCateListAction({ commit }) {
        getCateList({
            istree: 1
        })
            .then(res => {
                if (res.code === 200) {
                    commit('REQ_CATELIST', res.list)
                }
            })
    },
    // 封装获取商品规格列表
    getSpecsListAction({ commit }, pageInfo) {
        getSpecsList(pageInfo)
            .then(res => {
                if (res.code === 200) {
                    commit('REQ_SPECSLIST', res.list)
                }
            })
    },
    // 封装获取商品管理列表
    getGoodsListAction({ commit }, pageInfo) {
        getGoodsList(pageInfo)
            .then(res => {
                if (res.code === 200) {
                    commit('REQ_GOODSLIST', res.list)
                }
            })
    },
    // 封装获取会员管理列表
    getMemberListAction({ commit }) {
        getMemberList()
            .then(res => {
                if (res.code === 200) {
                    commit('REQ_MEMBERLIST', res.list)
                }
            })
    },
    // 封装获取轮播图管理列表
    getBannerListAction({ commit }) {
        getBannerList().then(res => {
            if (res.code === 200) {
                commit('REQ_BANNERLIST', res.list)
            }
        })
    },
    // 封装获取限时秒杀管理列表
    getSeckListAction({ commit }) {
        getSeckList().then(res => {
            if (res.code === 200) {
                commit("REQ_SECKLIST", res.list)
            }
        })
    }
}