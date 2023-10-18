import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, View, useColorScheme } from 'react-native';
import { BottomTabBar } from '@react-navigation/bottom-tabs'
import Colors from '../../constants/Colors';
import Player from '../../components/Player';
import React from 'react';


function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>['name'];
	color: string;
}) {
	return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
			}}
			// специальная возможность переопределить tabBar, чтобы добавить плеер
			// плеер должен быть спозиционирован абсолютно, чтобы за ним был виден список с треками, иначе плеер
			// расматривается как часть таббара и перекрывает ui сзади себя
			tabBar={(props) => (
				<View>
					
					<Player />
					<BottomTabBar {...props} />
				</View>
			)}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Home',
					tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
					headerRight: () => (
						<Link href="/modal" asChild>
							<Pressable>
								{({ pressed }) => (
									<FontAwesome
										name="info-circle"
										size={22}
										color={Colors[colorScheme ?? 'light'].text}
										style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
									/>
								)}
							</Pressable>
						</Link>
					),
				}}
			/>
			<Tabs.Screen
				name="search"
				options={{
					title: 'Search',
					headerShown: false,
					tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="favorites"
				options={{
					title: 'Favorites',
					tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
				}}
			/>
		</Tabs>
	);
}
// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { Link, Tabs } from 'expo-router';
// import { Pressable, useColorScheme } from 'react-native';
// import { BottomTabBar } from '@react-navigation/bottom-tabs'
// import Colors from '../../constants/Colors';


// function TabBarIcon(props: {
// 	name: React.ComponentProps<typeof FontAwesome>['name'];
// 	color: string;
// }) {
// 	return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
// }

// export default function TabLayout() {
// 	const colorScheme = useColorScheme();

// 	return (
// 		<Tabs
// 			screenOptions={{
// 				tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
// 			}}>
// 			<Tabs.Screen
// 				name="index"
// 				options={{
// 					title: 'Home',
// 					tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
// 					headerRight: () => (
// 						<Link href="/modal" asChild>
// 							<Pressable>
// 								{({ pressed }) => (
// 									<FontAwesome
// 										name="info-circle"
// 										size={22}
// 										color={Colors[colorScheme ?? 'light'].text}
// 										style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
// 									/>
// 								)}
// 							</Pressable>
// 						</Link>
// 					),
// 				}}
// 			/>
// 			<Tabs.Screen
// 				name="search"
// 				options={{
// 					title: 'Search',
// 					headerShown: false,
// 					tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
// 				}}
// 			/>
// 			<Tabs.Screen
// 				name="favorites"
// 				options={{
// 					title: 'Favorites',
// 					tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
// 				}}
// 			/>
// 		</Tabs>
// 	);
// }
