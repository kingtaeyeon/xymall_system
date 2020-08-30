/**
 * @func: 颜色选择组件
 * @author: LiHao
 * @since  2020-08-23 1:28
 **/
import React, {memo, useCallback, useMemo, useState} from 'react';
import {
    SketchPicker,
    CustomPicker,
    GithubPicker,
    TwitterPicker,
    SwatchesPicker,
    ChromePicker
} from 'react-color';
import { Popover } from "antd";

import './index.less';

interface IProps {
    onChangeComplete: (color: string) => void;
    type?: string;
    position?: string;
    themColor?: string;
    small?: boolean;
}

const pickers: {
    [key: string]: React.ReactNode
} = {
    sketch: SketchPicker,
    chrome: ChromePicker,
    github: GithubPicker,
    twitter: TwitterPicker,
    custom: CustomPicker,
    swatch: SwatchesPicker
};

const PickColor: React.FC<IProps> = (props) => {

    const {
        type = 'sketch',
        position = 'bottom',
        themColor,
        onChangeComplete
    } = props;

    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const [color, setColor] = useState(themColor);

    const Picker: any = pickers[type];

    // 颜色选择的change事件
    const handleChange = () => {

    };

    const handleChangeComplete = (color: any) => {
        onChangeComplete(color.hex);
        setColor(color.hex);
    };

    const handleClosePick = useCallback(() => {
        setDisplayColorPicker(false);
    }, []);

    // 展示色块的点击
    const handleClick = useCallback(() => {
        setDisplayColorPicker(!displayColorPicker);
    }, [ displayColorPicker ]);

    const { swatch, picker } = useMemo(() => {
        const styles: any = {
            wrapper: {
                position: 'inherit',
                zIndex: 100
            }
        };

        if( position === 'top' ) {
            styles.wrapper.transform = 'translateY(-100%)';
            styles.wrapper.paddingBottom = 8;
        }

        const swatch = (
            <Popover
                content="更换主题色"
            >
                <div className="swatch"
                    onClick={handleClick}
                >
                    <div className="swatch-color"
                        style={{
                            background: color
                        }}
                    />
                </div>
            </Popover>
        );

        const picker = displayColorPicker
            ? (
                <div className="popover">
                    <div className="cover"
                        onClick={handleClosePick}
                    />
                    <div
                        style={styles.wrapper}
                    >
                        <Picker
                            { ...props }
                            color={color}
                            onchange={handleChange}
                            onChangeComplete={handleChangeComplete}
                        />
                    </div>
                </div>
            )
            : null;

        return {
            swatch,
            picker
        }
    }, [position, handleClick, color, displayColorPicker, handleClosePick, props, handleChangeComplete]);

    return (
        <div className="pick-color">
            { swatch }

            { picker }
        </div>
    )
};


export default memo(PickColor);


