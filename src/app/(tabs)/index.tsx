import { ActivityIndicator, ActivityIndicatorBase, FlatList, Image, StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import TrackListItem from '../../components/TrackListItem';
import { gql, useQuery } from '@apollo/client';

const query = gql`
	query MyQuery($genres: String) {
		recommendations(seed_genres: $genres) {
			tracks {
				id
				name
				preview_url
				artists {
					name
					id
				}
				album {
					id
					name
					images {
						height
						url
						width
					}
				}
			}
		}
	}
`


export default function HomeScreen() {
	const { data, loading, error } = useQuery(query, { variables: { genres: 'rock' } })

	if (loading) return <ActivityIndicator />

	const tracks = data?.recommendations?.tracks ?? []

	return (
		<View style={styles.container}>
			<FlatList data={tracks}
				renderItem={({ item }) => (
					<View>
						<TrackListItem track={item} />
					</View>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},

});
