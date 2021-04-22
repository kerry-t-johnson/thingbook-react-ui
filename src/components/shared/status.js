import React from "react";
import { Badge, OverlayTrigger, Popover } from "react-bootstrap";


export function PopoverImpl(props) {

}

export class Status extends React.Component {

    render() {
        const { successLabel = "Successful", failLabel = "Failed" } = this.props;

        if (this.props.popover !== undefined) {
            const popover = (
                <Popover id="popover-basic">
                    <Popover.Title as="h3">{this.props.popover?.label}</Popover.Title>
                    <Popover.Content>{this.props.popover?.value}</Popover.Content>
                </Popover>
            );

            return (
                <>
                    {this.props.label}:
                    <OverlayTrigger delay={{ show: 250, hide: 400 }} placement="right" overlay={popover}>
                        <Badge pill variant={this.props.value ? "success" : "danger"}>{this.props.value ? successLabel : failLabel}</Badge>
                    </OverlayTrigger>
                </>
            );
        }
        else {
            return (
                <>
                    {this.props.label}:
                    <Badge pill variant={this.props.value ? "success" : "danger"}>{this.props.value.toString()}</Badge>
                </>
            );
        }
    }

}