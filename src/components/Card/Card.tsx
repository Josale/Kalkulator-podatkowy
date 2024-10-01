import React from "react";
import './Card.scss'

interface ICardProps {
    children: React.ReactNode;
}

export default class Card extends React.Component<ICardProps> {
    render() {

        const { children } = this.props;

        return (
            <div className='card'>
                <div className='card__header'>Oblicz podatek</div>
                    <div className='card__body'>
                        {children}
                    </div>
            </div>
        );
    }
}