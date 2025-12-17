export const dataMap = {
    ConstantsAndConversions: {
        float: {
            description: 'Returns a constant or conversion of type float',
            type: 'float',
        },
        int: {
            description: 'Returns a constant or conversion of type int',
            type: 'int',
        },
        uint: {
            description: 'Returns a constant or conversion of type uint',
            type: 'uint',
        },
        bool: {
            description: 'Returns a constant or conversion of type boolean',
            type: 'boolean',
        },
        color: {
            description: 'Returns a constant or conversion of type color',
            type: 'color',
        },
        vec2: {
            description: 'Returns a constant or conversion of type vec2',
            type: 'vec2',
        },
        vec3: {
            description: 'Returns a constant or conversion of type vec3',
            type: 'vec3',
        },
        vec4: {
            description: 'Returns a constant or conversion of type vec4',
            type: 'vec4',
        },
        mat2: {
            description: 'Returns a constant or conversion of type mat2',
            type: 'mat2',
        },
        mat3: {
            description: 'Returns a constant or conversion of type mat3',
            type: 'mat3',
        },
        mat4: {
            description: 'Returns a constant or conversion of type mat4',
            type: 'mat4',
        },
        ivec2: {
            description: 'Returns a constant or conversion of type ivec2',
            type: 'ivec2',
        },
        ivec3: {
            description: 'Returns a constant or conversion of type ivec3',
            type: 'ivec3',
        },
        ivec4: {
            description: 'Returns a constant or conversion of type ivec4',
            type: 'ivec4',
        },
        uvec2: {
            description: 'Returns a constant or conversion of type uvec2',
            type: 'uvec2',
        },
        uvec3: {
            description: 'Returns a constant or conversion of type uvec3',
            type: 'uvec3',
        },
        uvec4: {
            description: 'Returns a constant or conversion of type uvec4',
            type: 'uvec4',
        },
        bvec2: {
            description: 'Returns a constant or conversion of type bvec2',
            type: 'bvec2',
        },
        bvec3: {
            description: 'Returns a constant or conversion of type bvec3',
            type: 'bvec3',
        },
        bvec4: {
            description: 'Returns a constant or conversion of type bvec4',
            type: 'bvec4',
        },
    },
    MethodChainingConversions: {
        toFloat: {
            description: 'Converts to float',
            type: 'float',
        },
        toInt: {
            description: 'Converts to int',
            type: 'int',
        },
        toUint: {
            description: 'Converts to uint',
            type: 'uint',
        },
        toBool: {
            description: 'Converts to boolean',
            type: 'boolean',
        },
        toColor: {
            description: 'Converts to color',
            type: 'color',
        },
        toVec2: {
            description: 'Converts to vec2',
            type: 'vec2',
        },
        toVec3: {
            description: 'Converts to vec3',
            type: 'vec3',
        },
        toVec4: {
            description: 'Converts to vec4',
            type: 'vec4',
        },
        toMat2: {
            description: 'Converts to mat2',
            type: 'mat2',
        },
        toMat3: {
            description: 'Converts to mat3',
            type: 'mat3',
        },
        toMat4: {
            description: 'Converts to mat4',
            type: 'mat4',
        },
        toIVec2: {
            description: 'Converts to ivec2',
            type: 'ivec2',
        },
        toIVec3: {
            description: 'Converts to ivec3',
            type: 'ivec3',
        },
        toIVec4: {
            description: 'Converts to ivec4',
            type: 'ivec4',
        },
        toUVec2: {
            description: 'Converts to uvec2',
            type: 'uvec2',
        },
        toUVec3: {
            description: 'Converts to uvec3',
            type: 'uvec3',
        },
        toUVec4: {
            description: 'Converts to uvec4',
            type: 'uvec4',
        },
        toBVec2: {
            description: 'Converts to bvec2',
            type: 'bvec2',
        },
        toBVec3: {
            description: 'Converts to bvec3',
            type: 'bvec3',
        },
        toBVec4: {
            description: 'Converts to bvec4',
            type: 'bvec4',
        },
    },
    Uniform: {
        uniform: {
            description: 'Creates dynamic uniform values (e.g., number, Color, Vector, Matrix).',
            // updateMethods: {
            //     onObjectUpdate: 'Updated per rendered object.',
            //     onRenderUpdate: 'Updated once per render.',
            //     onFrameUpdate: 'Updated once per frame.',
            // },
        },
    },
    Textures: {
        texture: {
            description: 'Sample 2D texture',
            type: 'vec4',
        },
        cubeTexture: {
            description: 'Sample cube texture',
            type: 'vec4',
        },
        triplanarTexture: {
            description: 'Triplanar mapping',
            type: 'vec4',
        },
    },
    Attributes: {
        attribute: {
            description: 'Access geometry attribute by name',
            type: 'any',
        },
        uv: {
            description: 'UV attribute (index optional)',
            type: 'vec2',
        },
        vertexColor: {
            description: 'Vertex color attribute',
            type: 'color',
        },
    },
    Position: {
        positionGeometry: {
            description: 'Raw position attribute',
            type: 'vec3',
        },
        positionLocal: {
            description: 'Local-space position (post skinning/morph)',
            type: 'vec3',
        },
        positionWorld: {
            description: 'World-space position',
            type: 'vec3',
        },
        positionWorldDirection: {
            description: 'Normalized world direction',
            type: 'vec3',
        },
        positionView: {
            description: 'View-space position',
            type: 'vec3',
        },
        positionViewDirection: {
            description: 'Normalized view direction',
            type: 'vec3',
        },
    },
    Normal: {
        normalGeometry: {
            description: 'Raw normal attribute',
            type: 'vec3',
        },
        normalLocal: {
            description: 'Local-space normal',
            type: 'vec3',
        },
        normalView: {
            description: 'View-space normal',
            type: 'vec3',
        },
        normalWorld: {
            description: 'World-space normal',
            type: 'vec3',
        },
        transformedNormalView: {
            description: 'Transformed view normal (post skin/morph)',
            type: 'vec3',
        },
        transformedNormalWorld: {
            description: 'Transformed world normal',
            type: 'vec3',
        },
        transformedClearcoatNormalView: {
            description: 'Clearcoat transformed view normal',
            type: 'vec3',
        },
    },
    Tangent: {
        tangentGeometry: {
            description: 'Raw tangent attribute',
            type: 'vec4',
        },
        tangentLocal: {
            description: 'Local-space tangent',
            type: 'vec3',
        },
        tangentView: {
            description: 'View-space tangent',
            type: 'vec3',
        },
        tangentWorld: {
            description: 'World-space tangent',
            type: 'vec3',
        },
        transformedTangentView: {
            description: 'Transformed view tangent',
            type: 'vec3',
        },
        transformedTangentWorld: {
            description: 'Transformed world tangent',
            type: 'vec3',
        },
    },
    Bitangent: {
        bitangentGeometry: {
            description: 'Geometry-space bitangent',
            type: 'vec3',
        },
        bitangentLocal: {
            description: 'Local-space bitangent',
            type: 'vec3',
        },
        bitangentView: {
            description: 'View-space bitangent',
            type: 'vec3',
        },
        bitangentWorld: {
            description: 'World-space bitangent',
            type: 'vec3',
        },
        transformedBitangentView: {
            description: 'Transformed view bitangent',
            type: 'vec3',
        },
        transformedBitangentWorld: {
            description: 'Transformed world bitangent',
            type: 'vec3',
        },
    },
    Camera: {
        cameraNear: {
            type: 'float',
        },
        cameraFar: {
            type: 'float',
        },
        cameraProjectionMatrix: {
            type: 'mat4',
        },
        cameraProjectionMatrixInverse: {
            type: 'mat4',
        },
        cameraViewMatrix: {
            type: 'mat4',
        },
        cameraWorldMatrix: {
            type: 'mat4',
        },
        cameraNormalMatrix: {
            type: 'mat3',
        },
        cameraPosition: {
            type: 'vec3',
        },
    },
    Model: {
        modelDirection: {
            type: 'vec3',
        },
        modelViewMatrix: {
            type: 'mat4',
        },
        modelNormalMatrix: {
            type: 'mat3',
        },
        modelWorldMatrix: {
            type: 'mat4',
        },
        modelPosition: {
            type: 'vec3',
        },
        modelScale: {
            type: 'vec3',
        },
        modelViewPosition: {
            type: 'vec3',
        },
        modelWorldMatrixInverse: {
            type: 'mat4',
        },
        highpModelViewMatrix: {
            type: 'mat4',
        },
        highpModelNormalViewMatrix: {
            type: 'mat3',
        },
    },
    Screen: {
        screenUV: {
            description: 'Normalized framebuffer coordinate',
            type: 'vec2',
        },
        screenCoordinate: {
            description: 'Physical pixel coordinate',
            type: 'vec2',
        },
        screentSize: {
            description: 'Framebuffer size in pixels',
            type: 'vec2',
        },
    },
    Viewport: {
        viewportUV: {
            type: 'vec2',
        },
        viewport: {
            type: 'vec4',
        },
        viewportCoordinate: {
            type: 'vec2',
        },
        viewportSize: {
            type: 'vec2',
        },
    },
    BlendModes: {
        blendBurn: {
            type: 'color',
        },
        blendDodge: {
            type: 'color',
        },
        blendOverlay: {
            type: 'color',
        },
        blendScreen: {
            type: 'color',
        },
        blendColor: {
            type: 'color',
        },
    },
    Reflect: {
        reflectView: {
            type: 'vec3',
        },
        reflectVector: {
            type: 'vec3',
        },
    },
    UVUtils: {
        matcapUV: {
            type: 'vec2',
        },
        rotateUV: {
            type: 'vec2',
        },
        spherizeUV: {
            type: 'vec2',
        },
        spritesheetUV: {
            type: 'vec2',
        },
        equirectUV: {
            type: 'vec2',
        },
    },
    Interpolation: {
        remap: {
            type: 'any',
        },
        remapClamp: {
            type: 'any',
        },
    },
    Random: {
        hash: {
            type: 'float',
        },
        range: {
            type: 'any',
        },
    },
    Rotate: {
        rotate: {
            type: 'vec2/vec3',
        },
    },
    Oscillator: {
        oscSine: {
            type: 'float',
        },
        oscSquare: {
            type: 'float',
        },
        oscTriangle: {
            type: 'float',
        },
        oscSawtooth: {
            type: 'float',
        },
    },
    Packing: {
        directionToColor: {
            type: 'color',
        },
        colorToDirection: {
            type: 'vec3',
        },
    },

    Operators: {
        add: {
            description: 'Addition',
        },
        sub: {
            description: 'Subtraction',
        },
        mul: {
            description: 'Multiplication',
        },
        div: {
            description: 'Division',
        },
        assign: {
            description: 'Assignment',
        },
        mod: {
            description: 'Modulo',
        },
        equal: {
            description: 'Equality comparison',
        },
        notEqual: {
            description: 'Inequality comparison',
        },
        lessThan: {
            description: 'Less than comparison',
        },
        greaterThan: {
            description: 'Greater than comparison',
        },
        lessThanEqual: {
            description: 'Less than or equal comparison',
        },
        greaterThanEqual: {
            description: 'Greater than or equal comparison',
        },
        and: {
            description: 'Logical AND',
        },
        or: {
            description: 'Logical OR',
        },
        not: {
            description: 'Logical NOT',
        },
        xor: {
            description: 'Logical XOR',
        },
        bitAnd: {
            description: 'Bitwise AND',
        },
        bitNot: {
            description: 'Bitwise NOT',
        },
        bitOr: {
            description: 'Bitwise OR',
        },
        bitXor: {
            description: 'Bitwise XOR',
        },
        shiftLeft: {
            description: 'Bit shift left',
        },
        shiftRight: {
            description: 'Bit shift right',
        },
    },
    Functions: {
        Fn: {
            description: 'Creates a controllable function environment (supports stack, assign, conditional).',
        },
        select: {
            description: 'Ternary conditional: select(condition, valueIfTrue, valueIfFalse)',
        },
    },
    Variables: {
        toVar: {
            description: 'Declares a reusable shader variable.',
        },
        toConst: {
            description: 'Declares an inline constant.',
        },
        Var: {
            description: 'Declares a reusable shader variable.',
        },
        Const: {
            description: 'Declares an inline constant.',
        },
        property: {
            description: 'Declares a property without initial value.',
        },
    },
    Varying: {
        vertexStage: {
            description: 'Computes a node in vertex stage, returns varying.',
        },
        varying: {
            description: 'Computes in vertex stage and passes interpolated value to fragment shader.',
        },
        varyingProperty: {
            description: 'Declares a varying property without initial value.',
        },
    },
    Conditional: {
        If: {
            description: 'If-Else control flow inside Fn().',
        },
        ElseIf: {
            description: 'Else-if branch.',
        },
        Else: {
            description: 'Else branch.',
        },
        select: {
            description: 'Ternary outside of functions.',
        },
    },
    Loops: {
        Loop: {
            description: 'Supports counted, ranged, boolean, nested, and backward loops.',
        },
        Break: {
            description: 'Break loop execution.',
        },
        Continue: {
            description: 'Skip to next loop iteration.',
        },
    },
    MathFunctions: {
        abs: {
            description: 'Absolute value',
        },
        acos: {
            description: 'Arccosine',
        },
        all: {
            description: 'All components true',
        },
        any: {
            description: 'Any component true',
        },
        asin: {
            description: 'Arcsine',
        },
        atan: {
            description: 'Arctangent',
        },
        bitcast: {
            description: 'Reinterpret bits as different type',
        },
        cbrt: {
            description: 'Cube root',
        },
        ceil: {
            description: 'Round up',
        },
        clamp: {
            description: 'Constrain between min and max',
        },
        cos: {
            description: 'Cosine',
        },
        cross: {
            description: 'Cross product',
        },
        dFdx: {
            description: 'Partial derivative w.r.t. x',
        },
        dFdy: {
            description: 'Partial derivative w.r.t. y',
        },
        degrees: {
            description: 'Radians to degrees',
        },
        difference: {
            description: 'Absolute difference',
        },
        distance: {
            description: 'Distance between points',
        },
        dot: {
            description: 'Dot product',
        },
        equals: {
            description: 'Equality check',
        },
        exp: {
            description: 'Natural exponentiation',
        },
        exp2: {
            description: '2^x',
        },
        faceforward: {
            description: 'Orient vector',
        },
        floor: {
            description: 'Round down',
        },
        fract: {
            description: 'Fractional part',
        },
        fwidth: {
            description: 'Sum of abs derivatives in x and y',
        },
        inverseSqrt: {
            description: '1 / sqrt(x)',
        },
        invert: {
            description: '1 - x',
        },
        length: {
            description: 'Vector length',
        },
        lengthSq: {
            description: 'Squared vector length',
        },
        log: {
            description: 'Natural log',
        },
        log2: {
            description: 'Base-2 log',
        },
        max: {
            description: 'Maximum of two values',
        },
        min: {
            description: 'Minimum of two values',
        },
        mix: {
            description: 'Linear interpolation',
        },
        negate: {
            description: '-x',
        },
        normalize: {
            description: 'Unit vector',
        },
        oneMinus: {
            description: '1 - x',
        },
        pow: {
            description: 'x^y',
        },
        pow2: {
            description: 'x²',
        },
        pow3: {
            description: 'x³',
        },
        pow4: {
            description: 'x⁴',
        },
        radians: {
            description: 'Degrees to radians',
        },
        reciprocal: {
            description: '1 / x',
        },
        reflect: {
            description: 'Reflection direction',
        },
        refract: {
            description: 'Refraction direction',
        },
        round: {
            description: 'Round to nearest integer',
        },
        saturate: {
            description: 'Clamp between 0 and 1',
        },
        sign: {
            description: 'Extract sign',
        },
        sin: {
            description: 'Sine',
        },
        smoothstep: {
            description: 'Hermite interpolation',
        },
        sqrt: {
            description: 'Square root',
        },
        step: {
            description: 'Step function',
        },
        tan: {
            description: 'Tangent',
        },
        transformDirection: {
            description: 'Transform direction and normalize',
        },
        trunc: {
            description: 'Remove fractional part',
        },
    },
};

export const trad = {
    position: {
        description: 'positionGeometry',
    },
    transformed: {
        description: 'positionLocal',
    },
    transformedNormal: {
        description: 'normalLocal',
    },
    vWorldPosition: {
        description: 'positionWorld',
    },
    vColor: {
        description: 'vertexColor()',
    },
    vUv: {
        description: 'uv()',
    },
    vNormal: {
        description: 'normalView',
    },
    viewMatrix: {
        description: 'cameraViewMatrix',
    },
    modelMatrix: {
        description: 'modelWorldMatrix',
    },
    modelViewMatrix: {
        description: 'modelViewMatrix',
    },
    projectionMatrix: {
        description: 'cameraProjectionMatrix',
    },
    diffuseColor: {
        description: 'material.colorNode',
    },
    gl_FragColor: {
        description: 'material.fragmentNode',
    },
};

export const material = {
    NodeMaterialSlots: {
        fragmentNode: {
            type: 'vec4',
        },
        vertexNode: {
            type: 'vec4',
        },
        geometryNode: {
            type: 'Fn()',
        },
        colorNode: {
            type: 'vec4',
        },
        depthNode: {
            type: 'float',
        },
        opacityNode: {
            type: 'float',
        },
        alphaTestNode: {
            type: 'float',
        },
        emissiveNode: {
            type: 'color',
        },
        normalNode: {
            type: 'vec3',
        },
        lightsNode: {
            type: 'lights()',
        },
        envNode: {
            type: 'color',
        },
        backdropNode: {
            type: 'vec3',
        },
        backdropAlphaNode: {
            type: 'float',
        },
        positionNode: {
            type: 'vec3',
        },
        castShadowNode: {
            type: 'vec4',
        },
        receivedShadowNode: {
            type: 'Fn()',
        },
        shadowPositionNode: {
            type: 'vec3',
        },
        aoNode: {
            type: 'float',
        },
        mrtNode: {
            type: 'mrt()',
        },
        outputNode: {
            type: 'vec4',
        },
    },
    LineDashedNodeMaterial: {
        dashScaleNode: {
            type: 'float',
        },
        dashSizeNode: {
            type: 'float',
        },
        gapSizeNode: {
            type: 'float',
        },
        offsetNode: {
            type: 'float',
        },
    },
    MeshPhongNodeMaterial: {
        shininessNode: {
            type: 'float',
        },
        specularNode: {
            type: 'color',
        },
    },
    MeshStandardNodeMaterial: {
        metalnessNode: {
            type: 'float',
        },
        roughnessNode: {
            type: 'float',
        },
    },
    MeshPhysicalNodeMaterial: {
        clearcoatNode: {
            type: 'float',
        },
        clearcoatRoughnessNode: {
            type: 'float',
        },
        clearcoatNormalNode: {
            type: 'vec3',
        },
        sheenNode: {
            type: 'color',
        },
        iridescenceNode: {
            type: 'float',
        },
        iridescenceIORNode: {
            type: 'float',
        },
        iridescenceThicknessNode: {
            type: 'float',
        },
        specularIntensityNode: {
            type: 'float',
        },
        specularColorNode: {
            type: 'color',
        },
        iorNode: {
            type: 'float',
        },
        transmissionNode: {
            type: 'color',
        },
        thicknessNode: {
            type: 'float',
        },
        attenuationDistanceNode: {
            type: 'float',
        },
        attenuationColorNode: {
            type: 'color',
        },
        dispersionNode: {
            type: 'float',
        },
        anisotropyNode: {
            type: 'vec2',
        },
    },
    SpriteNodeMaterial: {
        positionNode: {
            type: 'vec3',
        },
        rotationNode: {
            type: 'float',
        },
        scaleNode: {
            type: 'vec2',
        },
    },
};
