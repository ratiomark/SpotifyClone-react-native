import { FlatList, TextInput, Image, StyleSheet, Text, View, Keyboard, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView, } from 'react-native-safe-area-context';
import { tracks } from '../../assets/data/tracks';
import TrackListItem from '../../components/TrackListItem';
import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';

const query = gql`
	query MyQuery($q: String) {
		search(q: $q) {
			tracks {
				items {
					id
					preview_url
					name
					album {
						name
						images {
							url
						}
					}
					artists {
						name
						id
					}
				}
			}
		}
	}
`

export default function SearchScreen() {
	const [search, setSearch] = useState('')
	const { data, loading, error } = useQuery(query, { variables: { q: search } })

	const tracks = data?.search?.tracks?.items ?? []

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
				}}
					style={{ color: 'white' }}
				>
					Cancel
				</Text>
			</View>
			{<FlatList
				data={["All", "Track", "album", "artist", "playlist", "show", "episode", "audiobook"]}
				renderItem={({ item }) => (
					<TouchableOpacity style={{
						paddingHorizontal: 12, paddingVertical: 5,
						borderWidth: 1, borderColor: 'white', borderRadius: 999,
						marginHorizontal: 5,
					}}>
						<Text style={{ color: 'white' }}>{item}</Text>
					</TouchableOpacity>
				)}
				style={{ padding: 10 }}
				horizontal
			/>}
			{search !== '' && loading && <ActivityIndicator />}
			<FlatList
				data={tracks}
				renderItem={({ item }) => (
					<View>
						<TrackListItem track={item} />
					</View>
				)}
			/>


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
