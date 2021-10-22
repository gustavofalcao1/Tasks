import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#121214',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 0 : 50,
  },
  title: {
    color: '#00CC10',
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 48
  },
  input:{
    width: 300,
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
  buttonAuth:{
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00CC10',
    borderRadius: 50,
    marginTop: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2
  },
  buttonAuthText:{
    color: '#f5f5f5'
  },
  contentAlert:{
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  warningAlert:{
    paddingLeft: 10,
    color: '#f5f5f5',
    fontSize: 16,
  },
  buttonGoRegister:{
    marginTop: 20,
    color: '#f5f5f5'
  },
  linkRegister:{
    color: '#00CC10',
    fontSize: 15
  }
})

export default styles
