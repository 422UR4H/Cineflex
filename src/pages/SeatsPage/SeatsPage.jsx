import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { URL_SHOWTIMES } from "../../scripts/constants";

export default function SeatsPage() {
    const { id } = useParams();
    const [seats, setSeats] = useState(undefined);
    const [footer, setFooter] = useState(undefined);

    useEffect(() => {
        const promise = axios.get(`${URL_SHOWTIMES}/${id}/seats`);

        promise.then(({ data }) => {
            const selected = [];

            data.seats.forEach((s) => {
                selected.push({ ...s, isSelected: false });
            });
            setSeats(selected);
            setFooter({
                posterURL: data.movie.posterURL,
                title: data.movie.title,
                weekday: data.day.weekday,
                time: data.name
            });
        });
        promise.catch((error) => console.log(error.response.data));
    }, []);

    function select(seat, i) {
        if (!seat.isAvailable) {
            return;
        }
        const temp = [...seats];

        temp[i].isSelected = !seat.isSelected;
        setSeats(temp);
    }

    if (!seats) {
        return <>Carregando...</>;
    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {seats.map((s, i) => (
                    <SeatItem disabled={!s.isAvailable} isSelected={s.isSelected} key={s.id}>
                        <span disabled={!s.isAvailable} onClick={(() => select(s, i))}>{s.name}</span>
                    </SeatItem>
                ))}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle backgroundColor={"#1AAE9E"} borderColor={"#0E7D71"} />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle backgroundColor={"#C3CFD9"} borderColor={"#7B8B99"} />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle backgroundColor={"#FBE192"} borderColor={"#F7C52B"} />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                Nome do Comprador:
                <input placeholder="Digite seu nome..." />

                CPF do Comprador:
                <input placeholder="Digite seu CPF..." />

                <Link to="/success">
                    <button>Reservar Assento(s)</button>
                </Link>
            </FormContainer>

            <FooterContainer>
                <div>
                    <img src={footer.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{footer.title}</p>
                    <p>{footer.weekday} - {footer.time}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    );
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`;

const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`;

const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`;

const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`;

const CaptionCircle = styled.div`
    border: 1px solid ${({ borderColor }) => borderColor};
    background-color: ${({ backgroundColor }) => backgroundColor};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`;

const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`;

const SeatItem = styled.div`
    border: 1px solid ${({ disabled, isSelected }) => disabled ? "#F7C52B" : isSelected ? "#0E7D71" : "#7B8B99"};
    background-color: ${({ disabled, isSelected }) => disabled ? "#FBE192" : isSelected ? "#1AAE9E" : "#C3CFD9"};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;

    &:disabled {
        border: #F7C52B;
        background-color: #FBE192;
    }
`;

const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`;