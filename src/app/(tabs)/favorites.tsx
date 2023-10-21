import { ActivityIndicator, FlatList, Image, StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import TrackListItem from '../../components/TrackListItem';
import { gql, useQuery } from '@apollo/client';

const getFavoritesByUserId = gql`
	query getFavoritesByUserId($userId: String!) {
    favoritesByUserId(userid: $userId) {
      id
      trackid
      userid
      track {
        id
        name
        preview_url
        artists {
          id
          name
        }
        album {
          id
          name
          images {
            url
            width
            height
          }
        }
      }
    }
  }
`

export default function FavoritesScreen() {
	const { data, loading } = useQuery(getFavoritesByUserId, { variables: { userId: 'mark' } })

	if (loading) return <ActivityIndicator />

	const tracks = (data?.favoritesByUserId ?? []).map((fav) => fav.track);
	// console.log(tracks)
	return (
		<FlatList data={tracks}
			renderItem={({ item }) => (
				<View>
					<TrackListItem track={item} />
				</View>
			)}
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},

});
