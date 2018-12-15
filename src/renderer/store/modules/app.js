
const app = {
  state: {
    selectTags: [],
    rightClickperson: {},
    roomDetails: {}
  },

  mutations: {
    setTags: (state, tags) => {
      state.selectTags = tags
    },
    rightClickperson: (state, tags) => {
      state.rightClickperson = tags
    },
    roomDetails: (state, tags) => {
      state.roomDetails = tags
    }
  },
  actions: {
    initSelect ({commit}, tags) {
      commit('setTags', tags)
    },
    rightClickperson ({
      commit
    }, tags) {
      commit('rightClickperson', tags)
    },
    roomDetails ({
      commit
    }, tags) {
      commit('roomDetails', tags)
    }
  }

}
export default app
