import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121214',

  },
  label: {
    width: '90%',
    marginTop: 20,
    marginLeft: 20,
    fontSize: 16,
    color: '#00CC10'
  },
  input:{
    width: '90%',
    marginTop: 10,
    padding: 10,
    height: 50,
    backgroundColor: '#161617',
    color: '#f5f5f5',
    borderRadius: 50,
    paddingHorizontal: 40,
    marginLeft: 'auto',
    marginRight: 'auto',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2
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
  }
})

export default styles