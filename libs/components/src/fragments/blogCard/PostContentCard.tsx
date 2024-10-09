import { ICard } from "@royalfut/interfaces";
import { HeadPage } from "../../layout";

const PostContentCard = ({ card }: { card: ICard }) => {
    return (
        <div className={"flex w-full flex-col h-auto"}>
            <div className="block w-auto h-auto bg-transparent md:hidden">
                <HeadPage
                    img={"/image/backH1mobile.png"}
                    text={card.title}
                    positionText={"left"}
                    card={card}
                    bread={{ post: card.title }}
                />
            </div>
            <div className="hidden md:flex md:w-full md:h-auto md:opacity-100">
                <HeadPage
                    img={"/image/backH1desk.png"}
                    text={card.title}
                    positionText={"left"}
                    card={card}
                    bread={{ post: card.title }}
                />
            </div>
        </div>
    );
};

export default PostContentCard;
