import { useCallback, useState } from "react";
import { Control } from "@radix-ui/react-form";
import { Input } from "@royalfut/ui";
import { useTransferEAAccountStore } from "@royalfut/store";
import { EAMonocolorIcon } from "@royalfut/icons";
import BackupCodes from "./BackupCodes";

const BackupCodesField = () => {
    const { backups } = useTransferEAAccountStore();
    const [activeBackup, setActiveBackup] = useState(
        backups.length > 0 ? true : false
    );

    const onFocusPlaceholder = useCallback(() => {
        setActiveBackup(true);
    }, []);

    const onEmptyBlur = useCallback(() => {
        setActiveBackup(false);
    }, []);

    return (
        <Control asChild>
            <Input
                asChild={activeBackup ? true : false}
                required
                onFocus={onFocusPlaceholder}
                placeholder="Enter EA backup codes"
                icon={{
                    "<>": EAMonocolorIcon,
                    props: {
                        centered: true,
                        className:
                            "h-6 w-6 text-white-60 left-1 pointer-events-none",
                    },
                }}
                borderType="box"
                vtype={"primary"}
                cnBox="h-14 sm:h-12 w-full relative group inline-flex items-center justify-center z-[1]"
                type={"text"}
                className="text-xs pl-12 pr-4 font-medium">
                {activeBackup ? (
                    <BackupCodes onEmptyBlur={onEmptyBlur} />
                ) : null}
            </Input>
        </Control>
    );
};

export default BackupCodesField;
