import axios, { AxiosResponse } from "axios";
import { setLocale } from "./locale.helper";
import { setUser, setUserDefault } from "../features/user/userSlice";
import { BaseArguments } from "../interfaces/refactor.interface";
import { UserInterface } from "../interfaces/user.interface";
import { getServers } from "./servers.helper";


export async function getUser(args: BaseArguments) {
    const { dispatch, webApp, tgUser } = args;

    try {
        dispatch(setUserDefault());

        const { data: response }: AxiosResponse<UserInterface> = await axios.get(process.env.NEXT_PUBLIC_DOMAIN +
            '/user/' + tgUser?.id,
        );

        dispatch(setUser(response));

        getServers({
            dispatch: dispatch,
            webApp: webApp,
            tgUser: tgUser,
        });
    } catch (err: any) {
        webApp?.showAlert(setLocale(tgUser?.language_code).errors.get_user_error);

        console.error(err);
    }
}
