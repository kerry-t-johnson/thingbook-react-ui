import React from "react";

export default class Component extends React.Component {

    constructor(props) {
        super(props);

        this.selfLink = Component.extractSelfLink(props ?? {});
    }


    static extractSelfLink(props) {
        const selfLink = props.match?.params?.selfLink ?? props.selfLink;

        if (selfLink !== undefined) {
            return decodeURIComponent(selfLink);
        }
        else {
            return selfLink;
        }
    }
}