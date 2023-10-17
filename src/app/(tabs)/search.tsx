import { FlatList, TextInput, Image, StyleSheet, Text, View, Keyboard } from 'react-native';
import { SafeAreaView, } from 'react-native-safe-area-context';
import { tracks } from '../../assets/data/tracks';
import TrackListItem from '../../components/TrackListItem';
import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';

export default function SearchScreen() {
	const [search, setSearch] = useState('')
	return (

		<SafeAreaView >
			{/* <SafeAreaView style={styles.container}  > */}

			{/* <View style={styles.container}> */}
			<View style={styles.header} >

				<FontAwesome name='search' size={16} color={'gray'} />
				<TextInput
					value={search}
					onChangeText={setSearch}
					style={styles.input}
					placeholder='Find best music!'
					placeholderTextColor="grey"
				/>
				<Text onPress={() => {
					setSearch('')
					// Keyboard.dismiss()
				}
				} style={{ color: 'white' }} >Cancel</Text>
			</View>


			{/* <FlatList data={tracks}
				renderItem={({ item }) => (
					<View>
						<TrackListItem track={item} />
					</View>
				)}
			/> */}
			{/* </View> */}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		// alignItems: 'center',
		// justifyContent: 'center',
	},
	header: {
		// paddingTop: 20,
		flexDirection: 'row',
		// flex: 1,
		alignItems: 'center',
		padding: 10,
		// justifyContent: 'space-between',
	},
	inputWrapper: {
		// color: 'white',
	},
	input: {
		flex: 1,
		alignItems: 'center',
		color: 'white',
		backgroundColor: '#121314',
		padding: 5,
		borderRadius: 10,
		marginHorizontal: 10,
	}

});
