import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#121214',
    paddingTop: 60,
  },
  contextAllTasks:{
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  buttonArchivedTask:{
    justifyContent: 'center',
    paddingLeft: 15,
    marginTop: -10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2
  },
  taskContent: {
    width: '94%',
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    backgroundColor: '#161617',
    borderRadius: 10,
    marginBottom: 5,
    paddingTop: 15 ,
    paddingBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2
  },
  descriptionTaskArchived:{
    width: '80%',
    alignContent: 'flex-start',
    paddingHorizontal: 40,
    color: '#a0a0a0'
  },
  buttonArchivedTask:{
    left: -42,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  buttonDeleteTask:{
    left: -32,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  buttonNewTask:{
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#161617',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2
  },
  buttonDataSort:{
    width: 40,
    height: 40,
    position: 'absolute',
    top: 10,
    right: 20,
    backgroundColor: '#161617',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2
  }
})

export default styles