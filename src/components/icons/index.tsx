import { cloneElement, type ReactElement } from "react";
import {
	FaGithub,
	FaTwitter,
	FaStackOverflow,
	FaLinkedin,
	FaEnvelope,
	FaSpotify,
} from "react-icons/fa";
import { SocialIcon, SocialLinksContainer } from "./styles";

type SocialLinksArrayType = Array<{
	link: string;
	title: string;
	icon: ReactElement<{ title?: string }>;
}>;
export const SocialLinksOverlay = () => {
	const socialLinks: SocialLinksArrayType = [
		{
			link: "https://github.com/rajprakash00",
			title: "Raj's GitHub",
			icon: <FaGithub />,
		},
		{
			link: "https://twitter.com/RajprakashSahoo",
			title: "Raj's Twitter",
			icon: <FaTwitter />,
		},
		{
			link: "https://stackoverflow.com/users/11349303",
			title: "Raj's StackOverflow",
			icon: <FaStackOverflow />,
		},
		{
			link: "https://www.linkedin.com/in/rajprakash-sahoo-7597a216a",
			title: "Raj's LinkedIn",
			icon: <FaLinkedin />,
		},
		{
			link: "mailto:rajprakashwork20@gmail.com",
			title: "Send email to Rajprakash",
			icon: <FaEnvelope />,
		},
		
		{
			link: "https://open.spotify.com/user/jxbppwfc8vqmbuyz1rxc44ep7",
			title: "Raj's Spotify",
			icon: <FaSpotify />,
		},
	];

	const IconWithProps = ({ icon, title }: { icon: ReactElement<{ title?: string }>; title: string }) =>
		cloneElement(icon, { title });

	return (
		<SocialLinksContainer>
			{socialLinks.map(({ link, title, icon }) => (
				<SocialIcon href={link} title={title} key={title} target="_blank">
					<IconWithProps {...{ icon, title }} />
				</SocialIcon>
			))}
		</SocialLinksContainer>
	);
};
