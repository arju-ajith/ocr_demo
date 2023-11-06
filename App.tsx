import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import TextRecognition from '@react-native-ml-kit/text-recognition';

const App = () => {
  const [result, setResult] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);
  const [imageURL, setImageURL] = useState<string>(
    'https://media.nngroup.com/media/articles/opengraph_images/Slide31articlestext-over-images.png',
  );
  const startProcess = async () => {
    setLoading(true);
    try {
      setResult('');
      const _result = await TextRecognition.recognize(imageURL);
      console.log('Recognized text:', _result.text);
      setResult(_result.text);
      for (let block of _result.blocks) {
        console.log('Block text:', block.text);
        console.log('Block frame:', block.frame);

        for (let line of block.lines) {
          console.log('Line text:', line.text);
          console.log('Line frame:', line.frame);
        }
      }
      setLoading(false);
    } catch (error) {
      setResult('Oops Something went wrong!');
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.headingText}>OCR Demo</Text>
        <View style={styles.headingText}>
          <TextInput
            value={imageURL}
            multiline={false}
            placeholder="Paste the image to link you want convert as a text"
            onChangeText={text => setImageURL(text)}
          />
        </View>
        <View style={styles.btnContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color="black" />
          ) : (
            <TouchableOpacity onPress={startProcess} style={styles.speak}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>
                Recognize Text
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.textInputStyle}>
          <TextInput
            value={result}
            editable={false}
            multiline={true}
            placeholder="Hey, Click 'Recognize Text' button!"
            style={{
              flex: 1,
              height: '100%',
            }}
            onChangeText={text => setResult(text)}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
  headingText: {
    alignSelf: 'center',
    marginVertical: 26,
    fontWeight: 'bold',
    fontSize: 26,
  },
  textInputStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 300,
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 16,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
    elevation: 2,
    shadowOpacity: 0.4,
    color: '#000',
  },
  speak: {
    backgroundColor: 'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 8,
  },
  stop: {
    backgroundColor: 'red',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 8,
  },
  clear: {
    backgroundColor: 'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    marginTop: 15,
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    with: '50%',
    justifyContent: 'space-evenly',
    marginTop: 24,
  },
});
export default App;
