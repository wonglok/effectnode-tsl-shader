export const materials = [
    {
        codeName: 'NodeMaterial',

        category: 'Materials',
        dataType: '',
        description: 'NodeMaterial Material Slots',
        sources: [],

        targets: [
            {
                name: 'fragmentNode',
                type: 'vec4',
            },
            {
                name: 'vertexNode',
                type: 'vec4',
            },
            {
                name: 'geometryNode',
                type: 'Fn()',
            },
            {
                name: 'colorNode',
                type: 'vec4',
            },
            {
                name: 'depthNode',
                type: 'float',
            },
            {
                name: 'opacityNode',
                type: 'float',
            },
            {
                name: 'alphaTestNode',
                type: 'float',
            },
            {
                name: 'emissiveNode',
                type: 'color',
            },
            {
                name: 'normalNode',
                type: 'vec3',
            },
            {
                name: 'lightsNode',
                type: 'lights()',
            },
            {
                name: 'envNode',
                type: 'color',
            },
            {
                name: 'backdropNode',
                type: 'vec3',
            },
            {
                name: 'backdropAlphaNode',
                type: 'float',
            },
            {
                name: 'positionNode',
                type: 'vec3',
            },
            {
                name: 'castShadowNode',
                type: 'vec4',
            },
            {
                name: 'receivedShadowNode',
                type: 'Fn()',
            },
            {
                name: 'shadowPositionNode',
                type: 'vec3',
            },
            {
                name: 'aoNode',
                type: 'float',
            },
            {
                name: 'mrtNode',
                type: 'mrt()',
            },
            {
                name: 'outputNode',
                type: 'vec4',
            },
        ],
    },

    {
        codeName: 'MeshPhongNodeMaterial',
        category: 'Materials',
        dataType: '',
        description: 'MeshPhongNodeMaterial Material Slots',
        sources: [],
        targets: [
            {
                name: 'fragmentNode',
                type: 'vec4',
            },
            {
                name: 'vertexNode',
                type: 'vec4',
            },
            {
                name: 'geometryNode',
                type: 'Fn()',
            },
            {
                name: 'colorNode',
                type: 'vec4',
            },
            {
                name: 'depthNode',
                type: 'float',
            },
            {
                name: 'opacityNode',
                type: 'float',
            },
            {
                name: 'alphaTestNode',
                type: 'float',
            },
            {
                name: 'emissiveNode',
                type: 'color',
            },
            {
                name: 'normalNode',
                type: 'vec3',
            },
            {
                name: 'lightsNode',
                type: 'lights()',
            },
            {
                name: 'envNode',
                type: 'color',
            },
            {
                name: 'backdropNode',
                type: 'vec3',
            },
            {
                name: 'backdropAlphaNode',
                type: 'float',
            },
            {
                name: 'positionNode',
                type: 'vec3',
            },
            {
                name: 'castShadowNode',
                type: 'vec4',
            },
            {
                name: 'receivedShadowNode',
                type: 'Fn()',
            },
            {
                name: 'shadowPositionNode',
                type: 'vec3',
            },
            {
                name: 'aoNode',
                type: 'float',
            },
            {
                name: 'mrtNode',
                type: 'mrt()',
            },
            {
                name: 'outputNode',
                type: 'vec4',
            },
            {
                name: 'shininessNode',
                type: 'float',
            },
            {
                name: 'specularNode',
                type: 'color',
            },
        ],
    },

    {
        codeName: 'MeshStandardNodeMaterial',
        category: 'Materials',
        dataType: '',
        description: 'MeshStandardNodeMaterial Material Slots',
        sources: [],
        targets: [
            {
                name: 'fragmentNode',
                type: 'vec4',
            },
            {
                name: 'vertexNode',
                type: 'vec4',
            },
            {
                name: 'geometryNode',
                type: 'Fn()',
            },
            {
                name: 'colorNode',
                type: 'vec4',
            },
            {
                name: 'depthNode',
                type: 'float',
            },
            {
                name: 'opacityNode',
                type: 'float',
            },
            {
                name: 'alphaTestNode',
                type: 'float',
            },
            {
                name: 'emissiveNode',
                type: 'color',
            },
            {
                name: 'normalNode',
                type: 'vec3',
            },
            {
                name: 'lightsNode',
                type: 'lights()',
            },
            {
                name: 'envNode',
                type: 'color',
            },
            {
                name: 'backdropNode',
                type: 'vec3',
            },
            {
                name: 'backdropAlphaNode',
                type: 'float',
            },
            {
                name: 'positionNode',
                type: 'vec3',
            },
            {
                name: 'castShadowNode',
                type: 'vec4',
            },
            {
                name: 'receivedShadowNode',
                type: 'Fn()',
            },
            {
                name: 'shadowPositionNode',
                type: 'vec3',
            },
            {
                name: 'aoNode',
                type: 'float',
            },
            {
                name: 'mrtNode',
                type: 'mrt()',
            },
            {
                name: 'outputNode',
                type: 'vec4',
            },
            {
                name: 'metalnessNode',
                type: 'float',
            },
            {
                name: 'roughnessNode',
                type: 'float',
            },
        ],
    },
    {
        codeName: 'MeshPhysicalNodeMaterial',
        category: 'Materials',
        dataType: '',
        description: 'MeshPhysicalNodeMaterial Material Slots',
        sources: [],
        targets: [
            {
                name: 'fragmentNode',
                type: 'vec4',
            },
            {
                name: 'vertexNode',
                type: 'vec4',
            },
            {
                name: 'geometryNode',
                type: 'Fn()',
            },
            {
                name: 'colorNode',
                type: 'vec4',
            },
            {
                name: 'depthNode',
                type: 'float',
            },
            {
                name: 'opacityNode',
                type: 'float',
            },
            {
                name: 'alphaTestNode',
                type: 'float',
            },
            {
                name: 'emissiveNode',
                type: 'color',
            },
            {
                name: 'normalNode',
                type: 'vec3',
            },
            {
                name: 'lightsNode',
                type: 'lights()',
            },
            {
                name: 'envNode',
                type: 'color',
            },
            {
                name: 'backdropNode',
                type: 'vec3',
            },
            {
                name: 'backdropAlphaNode',
                type: 'float',
            },
            {
                name: 'positionNode',
                type: 'vec3',
            },
            {
                name: 'castShadowNode',
                type: 'vec4',
            },
            {
                name: 'receivedShadowNode',
                type: 'Fn()',
            },
            {
                name: 'shadowPositionNode',
                type: 'vec3',
            },
            {
                name: 'aoNode',
                type: 'float',
            },
            {
                name: 'mrtNode',
                type: 'mrt()',
            },
            {
                name: 'outputNode',
                type: 'vec4',
            },
            {
                name: 'metalnessNode',
                type: 'float',
            },
            {
                name: 'roughnessNode',
                type: 'float',
            },
            //
            {
                name: 'clearcoatNode',
                type: 'float',
            },
            {
                name: 'clearcoatRoughnessNode',
                type: 'float',
            },
            {
                name: 'clearcoatNormalNode',
                type: 'vec3',
            },
            {
                name: 'sheenNode',
                type: 'color',
            },
            {
                name: 'iridescenceNode',
                type: 'float',
            },
            {
                name: 'iridescenceIORNode',
                type: 'float',
            },
            {
                name: 'iridescenceThicknessNode',
                type: 'float',
            },
            {
                name: 'specularIntensityNode',
                type: 'float',
            },
            {
                name: 'specularColorNode',
                type: 'color',
            },
            {
                name: 'iorNode',
                type: 'float',
            },
            {
                name: 'transmissionNode',
                type: 'color',
            },
            {
                name: 'thicknessNode',
                type: 'float',
            },
            {
                name: 'attenuationDistanceNode',
                type: 'float',
            },
            {
                name: 'attenuationColorNode',
                type: 'color',
            },
            {
                name: 'dispersionNode',
                type: 'float',
            },
            {
                name: 'anisotropyNode',
                type: 'vec2',
            },
        ],
    },

    //
    {
        codeName: 'LineDashedNodeMaterial',
        category: 'Materials',
        dataType: '',
        description: 'LineDashedNodeMaterial Material Slots',
        sources: [],
        targets: [
            {
                name: 'dashScaleNode',
                type: 'float',
            },
            {
                name: 'dashSizeNode',
                type: 'float',
            },
            {
                name: 'gapSizeNode',
                type: 'float',
            },
            {
                name: 'offsetNode',
                type: 'float',
            },
        ],
    },
    {
        codeName: 'SpriteNodeMaterial',
        category: 'Materials',
        dataType: '',
        description: 'SpriteNodeMaterial Material Slots',
        sources: [],
        targets: [
            {
                name: 'positionNode',
                type: 'vec3',
            },
            {
                name: 'rotationNode',
                type: 'float',
            },
            {
                name: 'scaleNode',
                type: 'vec2',
            },
        ],
    },
];
